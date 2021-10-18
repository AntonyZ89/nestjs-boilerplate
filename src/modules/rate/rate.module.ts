import { Module } from '@nestjs/common';
import { RateController, RateService } from '.';

@Module({
  exports: [RateService],
  controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
