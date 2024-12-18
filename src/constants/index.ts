import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Constants {
  private readonly emailUser: string;
  private readonly emailPass: string;
  private readonly port: number;

  constructor(private readonly configService: ConfigService) {
    this.emailUser = this.configService.get<string>('EMAIL_USER');
    this.port = this.configService.get<number>('PORT');
  }

  getEmailCredentials() {
    return {
      user: this.emailUser,
      pass: this.emailPass,
    };
  }
}
