import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOtpDto {
  @ApiProperty({ description: 'username for verify user', example: 'jon' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'otp code for verify user', example: '845621' })
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    description: 'expire time for one time password',
    example: '2025-01-07T05:03:42.681Z',
  })
  @IsNotEmpty()
  expire_time: Date;
}
