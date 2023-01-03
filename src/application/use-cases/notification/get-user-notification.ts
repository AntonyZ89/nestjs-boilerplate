import { NotificationRepository } from '@application/repositories';
import { Notification } from '@infra/database/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

interface GetUserNotificationRequest {
  page: number;
  limit: number;
  userId: number;
}

interface GetUserNotificationResponse {
  notifications: Pagination<Notification>;
}

@Injectable()
export class GetUserNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetUserNotificationRequest,
  ): Promise<GetUserNotificationResponse> {
    const paginatedNotifications = await this.notificationRepository.paginate(
      {
        page: request.page,
        limit: request.limit,
      },
      {
        where: { userId: request.userId },
      },
    );

    return {
      notifications: paginatedNotifications,
    };
  }
}
