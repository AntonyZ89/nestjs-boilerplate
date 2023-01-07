import { LoginResponse, UserWithNotificationsDTO } from '@infra/http/dtos';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
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

  /*
   * /auth/signup POST
   */

  describe('/auth/signup POST', () => {
    it('signup successfully', () =>
      req
        .post('/auth/signup')
        .send({ username: USERNAME, password: '123456' })
        .expect(HttpStatus.CREATED));

    it('wrong body', () =>
      req.post('/auth/signup').expect(HttpStatus.BAD_REQUEST));
  });

  it('auth/login (POST)', async () => {
    const response = await req
      .post('/auth/login')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.OK);

    const body: LoginResponse = response.body;

    accessToken = body.access_token;
  });

  /*
   * profile (GET)
   */

  it('profile (GET)', async () => {
    const response = await req
      .get('/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: UserWithNotificationsDTO = response.body;

    expect(body.username).toEqual(USERNAME);
  });

  /*
   * profile PUT
   */

  describe('profile PUT', () => {
    it('success', async () => {
      const NEW_USERNAME = 'new_username';

      await req
        .put('/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ username: NEW_USERNAME })
        .expect(HttpStatus.OK);

      const response = await req
        .get('/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.OK);

      const body: UserWithNotificationsDTO = response.body;

      expect(body.username).toEqual(NEW_USERNAME);
    });

    it('invalid username', () =>
      req
        .put('/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ username: 'invalid-username' })
        .expect(HttpStatus.BAD_REQUEST));
  });
});
