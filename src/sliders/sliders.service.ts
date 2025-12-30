import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  IsNull,
  Or,
} from 'typeorm';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Slider } from './entities/slider.entity';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider)
    private readonly sliderRepository: Repository<Slider>,
  ) {}

  async create(createSliderDto: CreateSliderDto): Promise<Slider> {
    const slider = this.sliderRepository.create(createSliderDto);
    return await this.sliderRepository.save(slider);
  }

  async findAll(): Promise<Slider[]> {
    return await this.sliderRepository.find({
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async findByPosition(position: string): Promise<Slider[]> {
    const now = new Date();
    return await this.sliderRepository.find({
      where: {
        position,
        isActive: true,
        startDate: Or(IsNull(), LessThanOrEqual(now)),
        endDate: Or(IsNull(), MoreThanOrEqual(now)),
      },
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Slider> {
    const slider = await this.sliderRepository.findOne({ where: { id } });
    if (!slider) {
      throw new NotFoundException(`اسلایدر با شناسه ${id} یافت نشد`);
    }
    return slider;
  }

  async update(updateSliderDto: UpdateSliderDto): Promise<Slider> {
    const slider = await this.findOne(updateSliderDto.id);
    Object.assign(slider, updateSliderDto);
    return await this.sliderRepository.save(slider);
  }

  async remove(id: string): Promise<boolean> {
    const slider = await this.findOne(id);
    await this.sliderRepository.remove(slider);
    return true;
  }
}
