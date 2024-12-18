import { Module } from '@nestjs/common';
import { RolesGuard } from './role';

@Module({
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class RoleModule {}
