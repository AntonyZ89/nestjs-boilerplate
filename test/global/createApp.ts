import { AppModule } from '@/app.module';
import { generateValidationPipe } from '@helper/app.helper';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';

let app: INestApplication;

async function init() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();

  app.useGlobalPipes(generateValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.init();

  global.app = app;
}

init();
