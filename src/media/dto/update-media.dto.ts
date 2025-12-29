import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateMediaSchema = z.object({
  description: z.string().max(500).optional(),
});

export class UpdateMediaDto extends createZodDto(updateMediaSchema) {}
