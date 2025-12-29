import { createZodDto } from 'nestjs-zod';
import { createTagSchema } from './create-tag.dto';
import { z } from 'zod';

export const updateTagSchema = createTagSchema.partial().extend({
  id: z.uuid(),
});

export class UpdateTagDto extends createZodDto(updateTagSchema) {}
