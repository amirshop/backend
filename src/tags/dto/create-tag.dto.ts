import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createTagSchema = z.object({
  title: z.string().min(1, 'عنوان تگ الزامی است'),
  slug: z.string().min(1, 'اسلاگ تگ الزامی است'),
  description: z
    .string()
    .min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد')
    .optional()
    .nullable(),
});

export class CreateTagDto extends createZodDto(createTagSchema) {}
