import { createZodDto } from 'nestjs-zod';
import { createPermissionSchema } from './create-permission.dto';
import { z } from 'zod';

export const updatePermissionSchema = createPermissionSchema.partial().extend({
  id: z.uuid(),
});

export class UpdatePermissionDto extends createZodDto(updatePermissionSchema) {}
