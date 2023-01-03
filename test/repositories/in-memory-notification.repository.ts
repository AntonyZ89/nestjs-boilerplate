import { NotificationRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/use-cases/errors';
import {
  Notification,
  NotificationCreateInput,
} from '@infra/database/typeorm/entities';
import { ValidationException } from '@infra/exceptions';
import { makePagination } from '@test/factories';
import { isEmpty } from 'class-validator';
import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Array<Notification> = [];

  async create(notification: NotificationCreateInput): Promise<Notification> {
    const payload = new Notification({
      id: this.notifications.length + 1,
      ...notification,
      readAt: this.#handleDate(notification.readAt),
      canceledAt: this.#handleDate(notification.canceledAt),
      createdAt: this.#handleDate(notification.createdAt || new Date()) as Date,
      updatedAt: this.#handleDate(notification.updatedAt || new Date()) as Date,
      deletedAt: this.#handleDate(notification.deletedAt),
    });

    // validate payload, if validation fails, throw an error
    this.#validateNotification({ data: payload });

    this.notifications.unshift(payload);

    return payload;
  }

  async findMany(): Promise<Notification[]> {
    return this.notifications;
  }

  async findById(notificationId: number): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    return notification || null;
  }

  async save(
    notificationId: number,
    data: Partial<Notification>,
  ): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notificationId);

    if (index === -1) throw new NotificationNotFound();

    const oldData = this.notifications[index];
    const newData = Object.assign(oldData, data);

    // validate new data, if validation fails, throw an error
    this.#validateNotification({ data: newData });

    this.notifications[index] = newData;
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.userId === userId,
    );
  }

  async delete(id: number): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === id);

    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  async paginate(
    options: IPaginationOptions<IPaginationMeta>,
    searchOptions?:
      | FindOptionsWhere<Notification>
      | FindManyOptions<Notification>,
  ): Promise<Pagination<Notification>> {
    let items = await this.findMany();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (searchOptions && searchOptions.where) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items = items.filter((item) => item.id === searchOptions.where.userId);
    }

    return makePagination(items, options);
  }

  /*
   * Utils
   */

  #handleDate(date: Date | string | undefined | null): Date | null {
    if (date instanceof Date) return date;

    if (typeof date === 'string') return new Date(date);

    return null;
  }

  /**
   * Validates the user data before saving it to the database.
   *
   * Only validations presents in User Entity
   * @see User
   */
  #validateNotification({ data }: { data: Notification }) {
    if (isEmpty(data.content)) {
      throw new ValidationException({
        errors: { content: 'Content cannot be empty' },
      });
    }

    if (isEmpty(data.category)) {
      throw new ValidationException({
        errors: { category: 'Category cannot be empty' },
      });
    }

    if (!data.userId) {
      throw new ValidationException({
        errors: { userId: 'userId is required' },
      });
    }
  }
}
