import { AuthService } from '@infra/auth/auth.service';
import { LocalAuthGuard } from '@infra/auth/guards';
import { Public } from '@infra/decorators';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: RequestType) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  profile(@Request() req: RequestType) {
    return req.user;
  }
}
