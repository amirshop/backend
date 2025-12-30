import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'نام دسته‌بندی الزامی است'),
  slug: z.string().min(1, 'اسلاگ دسته‌بندی الزامی است'),
  description: z
    .string()
    .min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد')
    .optional()
    .nullable(),
  image: z.string().max(500).optional().nullable(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  parentId: z.uuid().optional().nullable(),
});

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
