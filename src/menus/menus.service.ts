import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['parent', 'children'],
      order: { sortOrder: 'ASC', title: 'ASC' },
    });
  }

  async findByLocation(location: string): Promise<Menu[]> {
    return await this.menuRepository.find({
      where: {
        location,
        isActive: true,
        parentId: IsNull(),
      },
      relations: ['children'],
      order: { sortOrder: 'ASC' },
    });
  }

  async findRoots(location?: string): Promise<Menu[]> {
    if (location) {
      return await this.menuRepository.find({
        where: { parentId: IsNull(), location },
        relations: ['children'],
        order: { sortOrder: 'ASC' },
      });
    }
    return await this.menuRepository.find({
      where: { parentId: IsNull() },
      relations: ['children'],
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    if (!menu) {
      throw new NotFoundException(`منو با شناسه ${id} یافت نشد`);
    }
    return menu;
  }

  async findChildren(parentId: string): Promise<Menu[]> {
    return await this.menuRepository.find({
      where: { parentId },
      relations: ['children'],
      order: { sortOrder: 'ASC' },
    });
  }

  async update(updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(updateMenuDto.id);
    Object.assign(menu, updateMenuDto);
    return await this.menuRepository.save(menu);
  }

  async remove(id: string): Promise<boolean> {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
    return true;
  }

  async getLocations(): Promise<string[]> {
    const menus = await this.menuRepository
      .createQueryBuilder('menu')
      .select('DISTINCT menu.location', 'location')
      .getRawMany();
    return menus.map((m) => m.location);
  }
}
