import { createZodDto } from 'nestjs-zod';
import { createSliderSchema } from './create-slider.dto';
import { z } from 'zod';

export const updateSliderSchema = createSliderSchema.partial().extend({
  id: z.uuid(),
});

export class UpdateSliderDto extends createZodDto(updateSliderSchema) {}
