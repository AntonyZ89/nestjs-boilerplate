import { CreateUser } from '@application/use-cases/user';
import { AuthService } from '@infra/auth/auth.service';
import { LocalAuthGuard } from '@infra/auth/guards';
import { Public } from '@infra/decorators';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestType } from 'express';
import {
  BadRequestBody,
  UnauthorizedBody,
  UserCreateBody,
  UserDTO,
} from '../dtos';
import { UserCreateResponse } from '../dtos/user/user-create-response';
import { LoginResponse } from '../dtos/auth';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { SwaggerTags } from '@/enums';

@Controller()
@ApiTags(SwaggerTags.AUTH)
export class AppController {
  constructor(
    private authService: AuthService,
    private createUser: CreateUser,
  ) {}

  @Post('auth/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ type: LoginResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedBody })
  async login(@Request() req: RequestType): Promise<LoginResponse> {
    return this.authService.login(req.user as User);
  }

  @Post('auth/signup')
  @Public()
  @ApiOkResponse({ type: UserCreateResponse })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async signup(@Body() body: UserCreateBody): Promise<UserCreateResponse> {
    const { user } = await this.createUser.execute(body);

    return {
      model: user,
      message: 'Cadastrado com sucesso.',
    };
  }

  @Get('profile')
  @ApiOkResponse({ type: UserDTO })
  profile(@Request() req: RequestType) {
    return req.user;
  }
}
