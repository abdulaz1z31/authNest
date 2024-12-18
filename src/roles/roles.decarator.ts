import { SetMetadata } from '@nestjs/common';
import { userRole } from 'src/constants/role.enum';

export const Roles = (...roles: userRole[]) => SetMetadata('roles', roles);
