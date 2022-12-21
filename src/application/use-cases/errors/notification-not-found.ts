import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationNotFound extends HttpException {
  constructor() {
    super('Notificação não encontrada', HttpStatus.NOT_FOUND);
  }
}
