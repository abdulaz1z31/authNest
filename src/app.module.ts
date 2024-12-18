import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/lesson71'),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          service: config.get<string>('EMAIL_SERVICE'),
          auth: {
            user: config.get<string>('USER_EMAIL'),
            pass: config.get<string>('APP_PASSWORD'),
          },
        },
      }),
    }),
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
