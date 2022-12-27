import {
  CancelNotification,
  DeleteNotification,
  GetUserNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases/notification';
import { CreateUser } from '@application/use-cases/user';
import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AppController, NotificationController } from './controllers';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [NotificationController, AppController, UserController],
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
  ],
})
export class HttpModule {}
