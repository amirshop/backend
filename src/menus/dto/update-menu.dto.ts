import { createZodDto } from 'nestjs-zod';
import { createMenuSchema } from './create-menu.dto';
import { z } from 'zod';

export const updateMenuSchema = createMenuSchema.partial().extend({
  id: z.uuid(),
});

export class UpdateMenuDto extends createZodDto(updateMenuSchema) {}
