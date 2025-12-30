import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find({
      order: { group: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException(`دسترسی با شناسه ${id} یافت نشد`);
    }
    return permission;
  }

  async findByKey(key: string): Promise<Permission | null> {
    return await this.permissionRepository.findOne({ where: { key } });
  }

  async findByGroup(group: string): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: { group },
      order: { name: 'ASC' },
    });
  }

  async update(updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(updatePermissionDto.id);
    Object.assign(permission, updatePermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async remove(id: string): Promise<boolean> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);
    return true;
  }
}
