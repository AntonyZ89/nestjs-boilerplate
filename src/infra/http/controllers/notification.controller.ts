import { SwaggerTags } from '@/enums';
import { NotificationRepository } from '@application/repositories';
import {
  CancelNotification,
  CountRecipientNotification,
  DeleteNotification,
  GetRecipientNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases/notification';
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Notification } from '@prisma/client';
import {
  BadRequestBody,
  CreateNotificationBody,
  CreateNotificationResponseBody,
  NotFoundBody,
  NotificationDTO,
  ResponseBody,
} from '../dtos';

@ApiBearerAuth()
@Controller('notification')
@ApiTags(SwaggerTags.NOTIFICATION)
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
  @ApiOperation({ summary: 'Returns a list of all notifications.' })
  @ApiOkResponse({
    description: 'Returns a list of all notifications.',
    type: NotificationDTO,
    isArray: true,
  })
  list(): Promise<Array<Notification>> {
    return this.notificationRepository.findMany();
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new notification.' })
  @ApiCreatedResponse({
    description: 'Creates a new notification',
    type: CreateNotificationResponseBody,
  })
  @ApiBadRequestResponse({
    description: 'Failed to create notification',
    type: BadRequestBody,
  })
  async create(
    @Body() body: CreateNotificationBody,
  ): Promise<CreateNotificationResponseBody> {
    const { notification } = await this.sendNotification.execute(body);

    return {
      message: 'Criado com sucesso!',
      model: notification,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a notification.' })
  @ApiOkResponse({
    description: 'Deletes a notification',
    type: ResponseBody,
  })
  @ApiNotFoundResponse({ type: NotFoundBody })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseBody> {
    await this.deleteNotification.execute({ notificationId: id });

    return {
      message: 'Notificação removida com sucesso',
    };
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancels a notification.' })
  @ApiOkResponse({
    description: 'Cancels a notification',
    type: ResponseBody,
  })
  @ApiNotFoundResponse({ type: NotFoundBody })
  async cancel(@Param('id', ParseIntPipe) id: number): Promise<ResponseBody> {
    await this.cancelNotification.execute({ notificationId: id });

    return {
      message: 'Cancelado com sucesso.',
    };
  }

  @Get('count-from/:recipient_id')
  @ApiOperation({
    summary: 'Returns the number of notifications for a recipient.',
  })
  @ApiOkResponse({
    description: 'Returns the number of notifications for a recipient.',
    schema: {
      properties: {
        count: { type: 'number' },
      },
    },
  })
  async countFromRecipient(
    @Param('recipient_id') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipient_id')
  @ApiOperation({ summary: 'Returns a list of notifications for a recipient.' })
  @ApiOkResponse({
    description: 'Returns a list of notifications for a recipient.',
    type: NotificationDTO,
    isArray: true,
  })
  async getFromRecipient(
    @Param('recipient_id') recipientId: string,
  ): Promise<Array<Notification>> {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });

    return notifications;
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Marks a notification as read.' })
  @ApiOkResponse({
    description: 'Marks a notification as read.',
    type: ResponseBody,
  })
  @ApiNotFoundResponse({ type: NotFoundBody })
  async read(@Param('id', ParseIntPipe) id: number): Promise<ResponseBody> {
    await this.readNotification.execute({ notificationId: id });

    return {
      message: 'Marcado como lido com sucesso',
    };
  }

  @Patch(':id/unread')
  @ApiOperation({ summary: 'Marks a notification as unread.' })
  @ApiOkResponse({
    description: 'Marks a notification as unread.',
    type: ResponseBody,
  })
  @ApiNotFoundResponse({ type: NotFoundBody })
  async unread(@Param('id', ParseIntPipe) id: number): Promise<ResponseBody> {
    await this.unreadNotification.execute({ notificationId: id });

    return {
      message: 'Marcado como não lido com sucesso',
    };
  }
}
