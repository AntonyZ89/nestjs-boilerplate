import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';

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
