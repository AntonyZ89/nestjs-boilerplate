import { SendNotification } from '@application/use-cases/send-notification';
import { Module } from '@nestjs/common';
import { NotificationController } from './controllers/notification.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttpModule {}
