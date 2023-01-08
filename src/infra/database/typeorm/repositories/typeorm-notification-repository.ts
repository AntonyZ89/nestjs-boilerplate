import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Notification, NotificationCreateInput } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from '@application/repositories';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { NotificationNotFound } from '@application/use-cases/errors';

@Injectable()
export class TypeOrmNotificationRepository implements NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private repository: Repository<Notification>,
  ) {}

  create(notification: NotificationCreateInput): Promise<Notification> {
    const model = this.repository.create(notification);

    return this.repository.save(model);
  }

  findById(notificationId: number): Promise<Notification | null> {
    return this.repository.findOneBy({ id: notificationId });
  }

  findMany(): Promise<Notification[]> {
    return this.repository.find({ order: { id: 'DESC' } });
  }

  async save(
    notificationId: number,
    data: Partial<Notification>,
  ): Promise<void> {
    const notification = await this.repository.findOneBy({
      id: notificationId,
    });

    if (!notification) throw new NotificationNotFound();

    notification.load(data);

    await this.repository.update({ id: notificationId }, notification);
  }

  findByUserId(userId: number): Promise<Notification[]> {
    return this.repository.findBy({ userId });
  }

  async delete(notificationId: number): Promise<void> {
    await this.repository.softDelete(notificationId);
  }

  async paginate(
    options: IPaginationOptions,
    searchOptions?:
      | FindOptionsWhere<Notification>
      | FindManyOptions<Notification>,
  ): Promise<Pagination<Notification>> {
    return paginate<Notification>(this.repository, options, {
      order: { id: 'DESC' },
      ...searchOptions,
    });
  }
}
