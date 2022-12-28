import { NotificationRepository } from '@application/repositories';
import { Notification } from '@infra/database/typeorm/entities';
import { Injectable } from '@nestjs/common';

interface GetUserNotificationRequest {
  userId: number;
}

interface GetUserNotificationResponse {
  notifications: Array<Notification>;
}

@Injectable()
export class GetUserNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetUserNotificationRequest,
  ): Promise<GetUserNotificationResponse> {
    const notifications = await this.notificationRepository.findByUserId(
      request.userId,
    );

    return {
      notifications,
    };
  }
}
