import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({ description: 'username for login', example: 'jon1101' })
  username: string;
  @ApiProperty({ description: 'email for login', example: 'jon@gmail.com' })
  email?: string;
  @ApiProperty({ description: 'password for login', example: '@nPass.rd' })
  @IsString()
  password: string;
}
