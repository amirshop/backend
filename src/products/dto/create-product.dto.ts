import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'نام محصول الزامی است'),
  slug: z.string().min(1, 'اسلاگ محصول الزامی است'),
  image: z.string().min(1, 'تصویر محصول الزامی است'),
  price: z
    .number()
    .int('قیمت باید عدد صحیح باشد')
    .positive('قیمت باید عددی مثبت باشد'),
  discountPrice: z
    .number()
    .int('قیمت تخفیف باید عدد صحیح باشد')
    .positive('قیمت تخفیف باید عددی مثبت باشد')
    .optional()
    .nullable(),
  description: z
    .string()
    .min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد')
    .optional()
    .nullable(),
  stock: z
    .number()
    .int('موجودی باید عدد صحیح باشد')
    .min(0, 'موجودی نمی‌تواند منفی باشد')
    .default(0),
  isActive: z.boolean().default(true),
  tagIds: z.array(z.uuid()).optional().default([]),
  categoryIds: z.array(z.uuid()).optional().default([]),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}
