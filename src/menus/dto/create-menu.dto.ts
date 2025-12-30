import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createMenuSchema = z.object({
  title: z.string().min(1, 'عنوان منو الزامی است'),
  location: z.string().min(1, 'موقعیت منو الزامی است'),
  link: z.string().max(500).optional().nullable(),
  linkType: z
    .enum(['internal', 'external', 'category', 'product'])
    .default('internal'),
  icon: z.string().max(100).optional().nullable(),
  image: z.string().max(500).optional().nullable(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  openInNewTab: z.boolean().default(false),
  parentId: z.uuid().optional().nullable(),
});

export class CreateMenuDto extends createZodDto(createMenuSchema) {}
