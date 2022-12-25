import {
  NotificationRepository,
  UserRepository,
} from '@application/repositories';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaNotificationRepository,
  PrismaUserRepository,
} from './prisma/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [NotificationRepository, UserRepository],
})
export class DatabaseModule {}
