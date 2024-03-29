import { SwaggerTags } from '@/enums';
import { NotificationRepository } from '@application/repositories';
import {
  CancelNotification,
  DeleteNotification,
  GetUserNotification,
  ReadNotification,
  SendNotification,
  UnreadNotification,
} from '@application/use-cases/notification';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
import {
  BadRequestBody,
  CancelNotificationBody,
  CreateNotificationBody,
  CreateNotificationResponseBody,
  NotFoundBody,
  NotificationFromUserDTO,
  NotificationListDTO,
  ReadNotificationBody,
  ResponseBody,
  UnreadNotificationBody,
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
    private readonly deleteNotification: DeleteNotification,
    private readonly getUserNotification: GetUserNotification,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Returns a list of all notifications.' })
  @ApiOkResponse({
    description: 'Returns a list of all notifications.',
    type: NotificationListDTO,
  })
  list(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<NotificationListDTO> {
    return this.notificationRepository.paginate({ page, limit });
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
  async cancel(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CancelNotificationBody> {
    const { notification } = await this.cancelNotification.execute({
      notificationId: id,
    });

    return {
      model: notification,
      message: 'Cancelado com sucesso.',
    };
  }

  @Get('from-user/:user_id')
  @ApiOperation({ summary: 'Returns a list of notifications for a user.' })
  @ApiOkResponse({
    description: 'Returns a list of notifications for a user.',
    type: NotificationFromUserDTO,
  })
  async getFromUser(
    @Param('user_id', ParseIntPipe) userId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<NotificationFromUserDTO> {
    const { notifications } = await this.getUserNotification.execute({
      userId,
      page,
      limit,
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
  async read(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ReadNotificationBody> {
    const { notification } = await this.readNotification.execute({
      notificationId: id,
    });

    return {
      model: notification,
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
  async unread(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UnreadNotificationBody> {
    const { notification } = await this.unreadNotification.execute({
      notificationId: id,
    });

    return {
      model: notification,
      message: 'Marcado como não lido com sucesso',
    };
  }
}
