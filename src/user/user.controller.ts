import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/roles/roles.decarator';
import { userRole } from 'src/constants/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Roles(userRole.admin, userRole.superAdmin)
  findAll() {
    return this.userService.findAll();
  }
  @Roles(userRole.admin, userRole.superAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Roles(userRole.admin, userRole.superAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @Roles(userRole.admin, userRole.superAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
