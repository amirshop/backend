import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { tagIds, categoryIds, ...productData } = createProductDto;

    const product = this.productRepository.create(productData);

    if (tagIds && tagIds.length > 0) {
      product.tags = await this.tagRepository.find({
        where: { id: In(tagIds) },
      });
    }

    if (categoryIds && categoryIds.length > 0) {
      product.categories = await this.categoryRepository.find({
        where: { id: In(categoryIds) },
      });
    }

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['tags', 'categories'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['tags', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`محصول با شناسه ${id} یافت نشد`);
    }
    return product;
  }

  async findBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['tags', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`محصول با اسلاگ ${slug} یافت نشد`);
    }
    return product;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { categories: { id: categoryId } },
      relations: ['tags', 'categories'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTag(tagId: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { tags: { id: tagId } },
      relations: ['tags', 'categories'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(updateProductDto: UpdateProductDto): Promise<Product> {
    const { tagIds, categoryIds, ...productData } = updateProductDto;
    const product = await this.findOne(updateProductDto.id);

    Object.assign(product, productData);

    if (tagIds !== undefined) {
      product.tags =
        tagIds.length > 0
          ? await this.tagRepository.find({ where: { id: In(tagIds) } })
          : [];
    }

    if (categoryIds !== undefined) {
      product.categories =
        categoryIds.length > 0
          ? await this.categoryRepository.find({
              where: { id: In(categoryIds) },
            })
          : [];
    }

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<boolean> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return true;
  }
}
