import { User as TypeOrmUser } from '@infra/database/typeorm/entities';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends TypeOrmUser {}
  }
}
