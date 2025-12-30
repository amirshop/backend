import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createSliderSchema = z.object({
  title: z.string().min(1, 'عنوان اسلایدر الزامی است'),
  position: z.string().max(100).default('home'),
  image: z.string().min(1, 'تصویر اسلایدر الزامی است'),
  imageMobile: z.string().max(500).optional().nullable(),
  link: z.string().max(500).optional().nullable(),
  subtitle: z.string().max(255).optional().nullable(),
  description: z.string().optional().nullable(),
  buttonText: z.string().max(100).optional().nullable(),
  buttonColor: z.string().max(50).optional().nullable(),
  textColor: z.string().max(50).optional().nullable(),
  textAlign: z.enum(['left', 'center', 'right']).default('center'),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
});

export class CreateSliderDto extends createZodDto(createSliderSchema) {}
