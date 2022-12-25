import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationRequest {
  recipientId: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const count = await this.notificationRepository.countByRecipientId(
      request.recipientId,
    );

    return {
      count,
    };
  }
}
