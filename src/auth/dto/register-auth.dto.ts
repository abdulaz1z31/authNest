import { userRole } from 'src/constants/role.enum';

export class registerDto {
  username: string;
  email: string;
  password: string;
  role?: userRole;
  isActive?: boolean;
}
