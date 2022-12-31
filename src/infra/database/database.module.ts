import {
  NotificationRepository,
  UserRepository,
} from '@application/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification, User } from './typeorm/entities';
import {
  TypeOrmNotificationRepository,
  TypeOrmUserRepository,
} from './typeorm/repositories';
import { ExistConstraint } from './typeorm/helpers/decorators/exist.decorator';
import { UniqueConstraint } from './typeorm/helpers/decorators/unique.decorator';

const RULES = [ExistConstraint, UniqueConstraint];

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
    ...RULES,
  ],
  exports: [TypeOrmModule, NotificationRepository, UserRepository],
})
export class DatabaseModule {}
