import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors';

interface DeleteNotificationRequest {
  notificationId: number;
}

type DeleteNotificationResponse = void;

@Injectable()
export class DeleteNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: DeleteNotificationRequest,
  ): Promise<DeleteNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      request.notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    await this.notificationRepository.delete(notification.id);
  }
}
