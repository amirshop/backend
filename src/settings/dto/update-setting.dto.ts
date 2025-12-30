import { createZodDto } from 'nestjs-zod';
import { createSettingSchema } from './create-setting.dto';
import { z } from 'zod';

export const updateSettingSchema = createSettingSchema.partial().extend({
  id: z.string().uuid('شناسه نامعتبر است'),
});

export class UpdateSettingDto extends createZodDto(updateSettingSchema) {}
