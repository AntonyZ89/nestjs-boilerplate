import {
  CancelNotification,
  CountRecipientNotification,
  DeleteNotification,
  GetRecipientNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController, NotificationController } from './controllers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NotificationController, AppController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    DeleteNotification,
  ],
})
export class HttpModule {}
