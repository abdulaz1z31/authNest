import { IsNotEmpty } from 'class-validator';
export class OtpDataDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  otp: string;
}
