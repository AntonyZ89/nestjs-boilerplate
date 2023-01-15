import { LoginResponse, UserWithNotificationsDTO } from '@infra/http/dtos';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createApp } from './helpers';

describe('AppController (e2e)', () => {
  const USERNAME = 'test_user';
  const PASSWORD = '123456';

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
        .send({ username: USERNAME, password: PASSWORD })
        .expect(HttpStatus.CREATED));

    it('wrong body', () =>
      req.post('/auth/signup').expect(HttpStatus.BAD_REQUEST));
  });

  /*
   * /auth/signup POST
   */

  describe('auth/login (POST)', () => {
    it('login successfully', async () => {
      const response = await req
        .post('/auth/login')
        .send({ username: USERNAME, password: PASSWORD })
        .expect(HttpStatus.OK);

      const body: LoginResponse = response.body;

      accessToken = body.access_token;
    });

    it('login failed with username not found', () =>
      req
        .post('/auth/login')
        .send({
          username: 'wrong_username',
          password: 'wrong_password',
        })
        .expect(HttpStatus.UNAUTHORIZED));

    it('login failed with wrong password', () =>
      req
        .post('/auth/login')
        .send({
          username: USERNAME,
          password: 'wrong_password',
        })
        .expect(HttpStatus.UNAUTHORIZED));
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
    expect(body.password).toBeUndefined();
  });

  /*
   * profile PUT
   */

  describe('profile PUT', () => {
    it('update password', async () => {
      const NEW_PASSWORD = 'new_password';

      // update password
      await req
        .put('/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ password: NEW_PASSWORD })
        .expect(HttpStatus.OK);

      // auth again
      await req
        .post('/auth/login')
        .send({
          username: USERNAME,
          password: NEW_PASSWORD,
        })
        .expect(HttpStatus.OK);
    });

    it('update username', async () => {
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
