import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
  ParseUUIDPipe,
  HttpStatus,
  ParseFilePipe,
  MaxFileSizeValidator,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { multerConfig } from './multer.config';
import { UpdateMediaDto } from './dto/update-media.dto';
import { QueryMediaDto } from './dto/query-media.dto';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE })],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
    @Body('description') description?: string,
  ) {
    const media = await this.mediaService.saveFile(file, description);
    return {
      ...media,
      url: this.mediaService.getFileUrl(media),
    };
  }

  @Get('stats')
  getStats() {
    return this.mediaService.getStats();
  }

  @Get()
  findAll(@Query() query: QueryMediaDto) {
    return this.mediaService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const media = await this.mediaService.findOne(id);
    return {
      ...media,
      url: this.mediaService.getFileUrl(media),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    const media = await this.mediaService.update(id, updateMediaDto);
    return {
      ...media,
      url: this.mediaService.getFileUrl(media),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediaService.remove(id);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  bulkRemove(@Body('ids') ids: string[]) {
    return this.mediaService.bulkRemove(ids);
  }
}
