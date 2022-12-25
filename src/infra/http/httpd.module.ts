import {
  CancelNotification,
  CountRecipientNotification,
  DeleteNotification,
  GetRecipientNotification,
  GetUserNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases/notification';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController, NotificationController } from './controllers';
import { CreateUser } from '@application/use-cases/user';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NotificationController, AppController],
  providers: [
    // notification
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    DeleteNotification,
    GetUserNotification,
    // user
    CreateUser,
  ],
})
export class HttpModule {}
