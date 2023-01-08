<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Built with

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
  - JWT
  - Swagger
  - Class validator
  - Custom validators for database constraints
  - TypeORM
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![Husky](https://img.shields.io/badge/-husky-%23fff?style=for-the-badge)
- ![EditorConfig](https://img.shields.io/badge/-Editor%20Config-%23bbb?style=for-the-badge)

## Prints 📷

<details>
  <summary>Swagger</summary>

  URL: **/api**

  <img src="doc/prints/swagger.png" alt="Swagger API" />
</details>

<details>
  <summary>Friendly errors on response</summary>

  - Custom validators
    - **Unique** constraint
    - **Exist** constraint

  <img src="doc/prints/unique-validator.png" height="200" alt="Unique validator" />
  <img src="doc/prints/exist-validator.png" height="200" alt="Exist validator" />

  - All errors are returned inside **"errors"** key on response.
  - Validate model data before saving to database to get all database errors (via custom validators)

  <img src="doc/prints/unique-response.png" alt="Unique validator response" />
  <img src="doc/prints/exist-response.png" alt="Exist validator response" />
  <img src="doc/prints/invalid-response.png" alt="Exist validator response" />
</details>

<details>
  <summary>Test coverage</summary>

  ## e2e coverage (96%!)

  <img src="doc/prints/e2e-coverage.png" alt="e2e tests coverage" />
</details>

## Installation

```bash
$ npm install
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Roadmap

- [x] TypeORM
- [ ] Migrations
- [x] CRUD User
- [x] CRUD Notification
- [ ] JWT
  - [x] Access Token
  - [ ] Refresh Token
- [x] Pagination
- [ ] Unit tests
  - [x] Use cases
  - [ ] Controllers
  - [ ] Coverage 100% (30%)
- [x] e2e tests
  - [x] Coverage 100% (96% is almost 100% 👌)
- [x] Database constraints
- [ ] Fix docker
  - [ ] Update README.md with docker steps
- [ ] Run tests on Pull Requests
- [ ] PR template

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
