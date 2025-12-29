import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'نام محصول الزامی است'),
  image: z.string().min(1, 'تصویر محصول الزامی است'),
  price: z
    .number()
    .int('قیمت باید عدد صحیح باشد')
    .positive('قیمت باید عددی مثبت باشد'),
  description: z
    .string()
    .min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد')
    .optional(),
});

export class CreateProductDto extends createZodDto(createProductSchema) {}
