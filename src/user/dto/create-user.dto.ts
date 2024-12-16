import { userRole } from 'src/constants/role.enum';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  role?: userRole;
  isActive?: boolean;
}
