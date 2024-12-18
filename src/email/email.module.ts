import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './mailer';

@Module({
  imports: [MailerModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
