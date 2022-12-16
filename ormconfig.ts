import { DataSource, DataSourceOptions } from 'typeorm';

const OrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'postgres',
  synchronize: false,
  entities: ['dist/entities/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  // cli: {
  //   entitiesDir: 'src/entities',
  //   migrationsDir: 'src/migrations',
  // },
};

export default new DataSource(OrmConfig);
