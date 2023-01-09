import 'tsconfig-paths/register';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export default new DataSource({
  type: 'postgres',
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  migrationsTableName: 'migrations_typeorm',
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
