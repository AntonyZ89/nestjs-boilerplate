import { LoginResponse, UserWithNotificationsDTO } from '@infra/http/dtos';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './helpers';

describe('AppController (e2e)', () => {
  const USERNAME = 'test_user';

  let app: INestApplication;
  let accessToken: string;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    app = await createApp();
    req = request(app.getHttpServer());
  });

  afterAll(async () => await app.close());

  it('signup successfully - /auth/signup POST', () =>
    req
      .post('/auth/signup')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.CREATED));

  it('wrong body - /auth/signup POST', () =>
    req.post('/auth/signup').expect(HttpStatus.BAD_REQUEST));

  it('auth/login (POST)', async () => {
    const response = await req
      .post('/auth/login')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.OK);

    const body: LoginResponse = response.body;

    accessToken = body.access_token;
  });

  it('profile (GET)', async () => {
    const response = await req
      .get('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: UserWithNotificationsDTO = response.body;

    expect(body.username).toEqual(USERNAME);
  });

  it('profile (PUT)', async () => {
    // success
    await req
      .put('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ username: 'new_username' })
      .expect(HttpStatus.OK);

    const response = await req
      .get('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: UserWithNotificationsDTO = response.body;

    expect(body.username).toEqual('new_username');

    // wrong
    await req
      .put('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ username: 'invalid-username' })
      .expect(HttpStatus.BAD_REQUEST);
  });
});
