import {
  NotificationRepository,
  UserRepository,
} from '@application/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories';
import { User } from './typeorm/entities';
import { TypeOrmUserRepository } from './typeorm/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [NotificationRepository, UserRepository],
})
export class DatabaseModule {}
