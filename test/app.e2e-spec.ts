import { AppModule } from '@/app.module';
import { generateValidationPipe } from '@helper/app.helper';
import { LoginResponse, UserWithNotificationsDTO } from '@infra/http/dtos';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  const USERNAME = 'test_user';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(generateValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.init();
  });

  afterAll(() => app.close());

  it('signup successfully - /auth/signup POST', async () =>
    request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.CREATED));

  it('wrong body - /auth/signup POST', () =>
    request(app.getHttpServer())
      .post('/auth/signup')
      .expect(HttpStatus.BAD_REQUEST));

  it('auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.OK);

    const body: LoginResponse = response.body;

    accessToken = body.access_token;
  });

  it('profile (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: UserWithNotificationsDTO = response.body;

    expect(body.username).toEqual(USERNAME);
  });

  it('profile (PUT)', async () => {
    // success
    await request(app.getHttpServer())
      .put('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ username: 'new_username' })
      .expect(HttpStatus.OK);

    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: UserWithNotificationsDTO = response.body;

    expect(body.username).toEqual('new_username');

    // wrong
    await request(app.getHttpServer())
      .put('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ username: 'invalid-username' })
      .expect(HttpStatus.BAD_REQUEST);
  });
});
