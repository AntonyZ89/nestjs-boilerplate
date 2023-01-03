import { AppModule } from '@/app.module';
import { generateValidationPipe } from '@helper';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';

export async function createApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(generateValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return await app.init();
}
