import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

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
    const notifications = await this.notificationRepository.byRecipientId(
      request.recipientId,
    );

    return {
      notifications,
    };
  }
}
