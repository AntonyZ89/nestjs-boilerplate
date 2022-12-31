import {
  CancelNotification,
  DeleteNotification,
  GetUserNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases/notification';
import { CreateUser, UpdateUser } from '@application/use-cases/user';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController, NotificationController } from './controllers';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NotificationController, AppController],
  providers: [
    // notification
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    DeleteNotification,
    GetUserNotification,
    // user
    CreateUser,
    UpdateUser,
  ],
})
export class HttpModule {}
