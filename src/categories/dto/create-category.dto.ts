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
});

export class CreateCategoryDto extends createZodDto(createCategorySchema) {}
