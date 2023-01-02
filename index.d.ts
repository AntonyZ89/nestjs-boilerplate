import { User as TypeOrmUser } from '@infra/database/typeorm/entities';
import { INestApplication } from '@nestjs/common';

declare global {
  // eslint-disable-next-line no-var
  var app: INestApplication;

  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends TypeOrmUser {}
  }
}
