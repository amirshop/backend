import { createZodDto } from 'nestjs-zod';
import { createProductSchema } from './create-product.dto';
import { z } from 'zod';

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.uuid(),
});

export class UpdateProductDto extends createZodDto(updateProductSchema) {}
