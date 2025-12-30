import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get('locations')
  getLocations() {
    return this.menusService.getLocations();
  }

  @Get('roots')
  findRoots(@Query('location') location?: string) {
    return this.menusService.findRoots(location);
  }

  @Get('location/:location')
  findByLocation(@Param('location') location: string) {
    return this.menusService.findByLocation(location);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Get(':id/children')
  findChildren(@Param('id') id: string) {
    return this.menusService.findChildren(id);
  }

  @Patch()
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
