import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Array<Notification>;
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const notifications = await this.notificationRepository.findByRecipientId(
      request.recipientId,
    );

    return {
      notifications,
    };
  }
}
