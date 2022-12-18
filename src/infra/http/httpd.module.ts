import { SendNotification } from '@application/use-cases';
import { Module } from '@nestjs/common';
import { NotificationController } from './controllers';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttpModule {}
