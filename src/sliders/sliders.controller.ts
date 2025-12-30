import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { SlidersService } from './sliders.service';

@Controller('sliders')
export class SlidersController {
  constructor(private readonly slidersService: SlidersService) {}

  @Post()
  create(@Body() createSliderDto: CreateSliderDto) {
    return this.slidersService.create(createSliderDto);
  }

  @Get()
  findAll() {
    return this.slidersService.findAll();
  }

  @Get('position/:position')
  findByPosition(@Param('position') position: string) {
    return this.slidersService.findByPosition(position);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slidersService.findOne(id);
  }

  @Patch()
  update(@Body() updateSliderDto: UpdateSliderDto) {
    return this.slidersService.update(updateSliderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slidersService.remove(id);
  }
}
