import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, body: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text: body,
      });
      console.log('Email sended');
    } catch (error) {
      throw new Error(error);
    }
  }
}
