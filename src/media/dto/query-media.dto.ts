import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { MediaType } from '../entities/media.entity';

export const queryMediaSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Math.min(parseInt(val, 10), 100) : 20)),
  type: z.nativeEnum(MediaType).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'size', 'originalName']).optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional(),
});

export class QueryMediaDto extends createZodDto(queryMediaSchema) {}
