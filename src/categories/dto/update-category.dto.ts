import { createZodDto } from 'nestjs-zod';
import { createCategorySchema } from './create-category.dto';
import { z } from 'zod';

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: z.uuid(),
});

export class UpdateCategoryDto extends createZodDto(updateCategorySchema) {}
