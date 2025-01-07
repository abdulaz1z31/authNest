import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { userRole } from 'src/constants/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Username for user', example: 'jon1120' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email for user', example: 'jon@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password for user', example: '$eCret1.' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "User's status", example: true })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Role for user', example: userRole.user })
  @IsOptional()
  role?: userRole = userRole.user;
}
