import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  @Get()
  list(): Promise<Notification[]> {
    return this.notificationRepository.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const model = new Notification(body);

    await this.notificationRepository.create(model);

    return {
      message: 'Criado com sucesso!',
      model,
    };
  }
}
