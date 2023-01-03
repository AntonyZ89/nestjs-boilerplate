import {
  CancelNotificationBody,
  CreateNotificationBody,
  LoginResponse,
  NotificationDTO,
  ReadNotificationBody,
  UnreadNotificationBody,
} from '@infra/http/dtos';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createApp } from './helpers';

describe('Notification Controller', () => {
  const USERNAME = 'test_user';

  let app: INestApplication;
  let accessToken: string;
  let req: request.SuperTest<request.Test>;

  beforeAll(async () => {
    app = await createApp();

    req = request(app.getHttpServer());

    // create test user
    await req
      .post('/auth/signup')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.CREATED);
    const response = await req
      .post('/auth/login')
      .send({ username: USERNAME, password: '123456' })
      .expect(HttpStatus.OK);

    const body: LoginResponse = response.body;

    accessToken = body.access_token;
  });

  afterAll(async () => await app.close());

  /*
   * /notification GET
   */

  it('/notification GET', () =>
    req
      .get('/notification')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK));

  /*
   * /notification POST
   */

  it('success - /notification POST', () =>
    req
      .post('/notification')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: 1,
        category: 'test',
        content: 'A test notification',
      } satisfies CreateNotificationBody)
      .expect(HttpStatus.CREATED));

  it('invalid user id - /notification POST', () =>
    req
      .post('/notification')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: 100,
        category: 'test',
        content: 'A test notification',
      } satisfies CreateNotificationBody)
      .expect(HttpStatus.BAD_REQUEST));

  it('invalid body - /notification POST', () =>
    req
      .post('/notification')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: 1,
        content: 'A test notification',
      })
      .expect(HttpStatus.BAD_REQUEST));

  /*
   * /notification/:id/read PATCH
   */

  it('success - /notification/:id/read PATCH', async () => {
    const response = await req
      .patch('/notification/1/read')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: ReadNotificationBody = response.body;

    expect(body.model).toMatchObject({ id: 1 });
  });

  it('not found - /notification/:id/read PATCH', () =>
    req
      .patch('/notification/2/read')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND));

  /*
   * /notification/:id/unread PATCH
   */

  it('success - /notification/:id/unread PATCH', async () => {
    const response = await req
      .patch('/notification/1/unread')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: UnreadNotificationBody = response.body;

    expect(body.model).toMatchObject({ id: 1 });
  });

  it('not found - /notification/:id/unread PATCH', () =>
    req
      .patch('/notification/2/unread')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND));

  /*
   * /notification/:id/cancel PATCH
   */

  it('success - /notification/:id/cancel PATCH', async () => {
    const response = await req
      .patch('/notification/1/cancel')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: CancelNotificationBody = response.body;

    expect(body.model).toMatchObject({ id: 1 });
  });

  it('not found - /notification/:id/cancel PATCH', () =>
    req
      .patch('/notification/2/cancel')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND));

  /*
   * /notification/from-user/:user_id GET
   */

  it('success - /notification/from-user/:user_id GET', async () => {
    const response = await req
      .get('/notification/from-user/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: Array<NotificationDTO> = response.body;

    expect(body).toHaveLength(1);
    expect(body.at(0)).toMatchObject({ userId: 1 });
  });

  it('not found - /notification/from-user/:user_id GET', async () => {
    const response = await req
      .get('/notification/from-user/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK);

    const body: Array<Notification> = response.body;

    expect(body).toHaveLength(0);
  });

  /*
   * /notification/:id DELETE
   */

  it('success - /notification/:id DELETE', () =>
    req
      .delete('/notification/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK));

  it('not found - /notification/:id DELETE', () =>
    req
      .delete('/notification/2')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.NOT_FOUND));
});
