import {
  NotificationRepository,
  UserRepository,
} from '@application/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Notification } from './typeorm/entities';
import {
  TypeOrmUserRepository,
  TypeOrmNotificationRepository,
} from './typeorm/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User, Notification])],
  providers: [
    {
      provide: NotificationRepository,
      useClass: TypeOrmNotificationRepository,
    },
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [NotificationRepository, UserRepository],
})
export class DatabaseModule {}
