import 'tsconfig-paths/register';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;

export default new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrationsTableName: 'migrations_typeorm',
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
} as DataSourceOptions);
