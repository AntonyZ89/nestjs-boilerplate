import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories';
import {
  CancelNotification,
  CountRecipientNotification,
  DeleteNotification,
  GetRecipientNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Notification as PrismaNotification } from '@prisma/client';
import { CreateNotificationBody } from '../dtos';
import { Response, ResponseWithModel } from '../types';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly cancelNotification: CancelNotification,
    private readonly sendNotification: SendNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotification: CountRecipientNotification,
    private readonly getRecipientNotification: GetRecipientNotification,
    private readonly deleteNotification: DeleteNotification,
  ) {}

  @Get()
  list(): Promise<Array<Notification>> {
    return this.notificationRepository.findMany();
  }

  @Post()
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<ResponseWithModel<PrismaNotification>> {
    const { notification } = await this.sendNotification.execute(body);

    return {
      message: 'Criado com sucesso!',
      model: notification.toJSON(),
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    await this.deleteNotification.execute({ notificationId: id });

    return {
      message: 'Notificação removida com sucesso',
    };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id', ParseIntPipe) id: number) {
    await this.cancelNotification.execute({ notificationId: id });

    return {
      message: 'Cancelado com sucesso.',
    };
  }

  @Get('count-from/:recipient_id')
  async countFromRecipient(
    @Param('recipient_id') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipient_id')
  async getFromRecipient(
    @Param('recipient_id') recipientId: string,
  ): Promise<Array<PrismaNotification>> {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return notifications.map((n) => n.toJSON());
  }

  @Patch(':id/read')
  async read(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    await this.readNotification.execute({ notificationId: id });

    return {
      message: 'Marcado como lido com sucesso',
    };
  }

  @Patch(':id/unread')
  async unread(@Param('id', ParseIntPipe) id: number): Promise<Response> {
    await this.unreadNotification.execute({ notificationId: id });

    return {
      message: 'Marcado como não lido com sucesso',
    };
  }
}
