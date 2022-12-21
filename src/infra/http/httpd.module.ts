import {
  CancelNotification,
  CountRecipientNotification,
  GetRecipientNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases';
import { Module } from '@nestjs/common';
import { NotificationController } from './controllers';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
