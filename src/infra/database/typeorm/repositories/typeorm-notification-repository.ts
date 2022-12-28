import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification, NotificationCreateInput } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from '@application/repositories';

@Injectable()
export class TypeOrmNotificationRepository implements NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  create(notification: NotificationCreateInput): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  findById(notificationId: number): Promise<Notification | null> {
    return this.notificationRepository.findOneBy({ id: notificationId });
  }

  findMany(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  async save(
    notificationId: number,
    data: Partial<Notification>,
  ): Promise<void> {
    await this.notificationRepository.update({ id: notificationId }, data);
  }

  findByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findBy({ userId });
  }

  async delete(notificationId: number): Promise<void> {
    await this.notificationRepository.softDelete(notificationId);
  }
}
