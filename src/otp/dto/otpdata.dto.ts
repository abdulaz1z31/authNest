import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class OtpDataDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'username of user', example: 'jon' })
  username: string;

  @ApiProperty({ description: 'otp code for verify user', example: 142563 })
  @IsNotEmpty()
  otp: string;
}
