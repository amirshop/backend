import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { Media, MediaType } from './entities/media.entity';
import { UpdateMediaDto } from './dto/update-media.dto';
import { QueryMediaDto } from './dto/query-media.dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MediaStats {
  totalCount: number;
  totalSize: number;
  byType: Record<MediaType, { count: number; size: number }>;
}

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async saveFile(
    file: Express.Multer.File,
    description?: string,
  ): Promise<Media> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const mediaType = this.detectMediaType(file.mimetype);

    const media = this.mediaRepository.create({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path.replace(/\\/g, '/'),
      mimeType: file.mimetype,
      size: file.size,
      type: mediaType,
      description,
    });

    return this.mediaRepository.save(media);
  }

  private detectMediaType(mimeType: string): MediaType {
    if (mimeType.startsWith('image/')) {
      return MediaType.IMAGE;
    }
    if (mimeType.startsWith('video/')) {
      return MediaType.VIDEO;
    }
    if (mimeType.startsWith('audio/')) {
      return MediaType.AUDIO;
    }
    return MediaType.DOCUMENT;
  }

  async findAll(query: QueryMediaDto): Promise<PaginatedResult<Media>> {
    const {
      page = 1,
      limit = 20,
      type,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (type) {
      where.type = type;
    }

    if (search) {
      where.originalName = Like(`%${search}%`);
    }

    const [data, total] = await this.mediaRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (!media) {
      throw new NotFoundException(`Media with ID "${id}" not found`);
    }
    return media;
  }

  async update(id: string, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.findOne(id);

    if (updateMediaDto.description !== undefined) {
      media.description = updateMediaDto.description;
    }

    return this.mediaRepository.save(media);
  }

  async remove(id: string): Promise<void> {
    const media = await this.findOne(id);

    // Delete file from disk
    await this.deleteFileFromDisk(media.path);

    // Delete from database
    await this.mediaRepository.delete(id);
  }

  async bulkRemove(
    ids: string[],
  ): Promise<{ deleted: number; failed: number }> {
    let deleted = 0;
    let failed = 0;

    for (const id of ids) {
      try {
        await this.remove(id);
        deleted++;
      } catch {
        failed++;
      }
    }

    return { deleted, failed };
  }

  private async deleteFileFromDisk(filePath: string): Promise<void> {
    try {
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    } catch (error) {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
  }

  async getStats(): Promise<MediaStats> {
    const allMedia = await this.mediaRepository.find();

    const stats: MediaStats = {
      totalCount: allMedia.length,
      totalSize: 0,
      byType: {
        [MediaType.IMAGE]: { count: 0, size: 0 },
        [MediaType.VIDEO]: { count: 0, size: 0 },
        [MediaType.AUDIO]: { count: 0, size: 0 },
        [MediaType.DOCUMENT]: { count: 0, size: 0 },
      },
    };

    for (const media of allMedia) {
      stats.totalSize += media.size;
      stats.byType[media.type].count++;
      stats.byType[media.type].size += media.size;
    }

    return stats;
  }

  getFileUrl(media: Media): string {
    // Convert path to URL (assuming uploads are served from /uploads/)
    return `/${media.path}`;
  }
}
