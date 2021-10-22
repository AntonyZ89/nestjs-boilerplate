module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'nestjs',
  synchronize: false,
    entities: [
        "dist/entities/**/*.entity.js"
    ],
    migrations: [
        "dist/migrations/**/*.js"
    ],
    cli: {
        "entitiesDir": "src/entities",
        "migrationsDir": "src/migrations"
    }
};
