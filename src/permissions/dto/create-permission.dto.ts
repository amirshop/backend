import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createPermissionSchema = z.object({
  name: z.string().min(1, 'نام دسترسی الزامی است'),
  key: z.string().min(1, 'کلید دسترسی الزامی است'),
  description: z
    .string()
    .min(3, 'توضیحات باید حداقل ۳ کاراکتر باشد')
    .optional()
    .nullable(),
  group: z.string().min(1, 'گروه دسترسی الزامی است'),
});

export class CreatePermissionDto extends createZodDto(createPermissionSchema) {}
