import { SwaggerTags } from '@/enums';
import { UserRepository } from '@application/repositories';
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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request as RequestType } from 'express';
import {
  BadRequestBody,
  LoginBody,
  LoginResponse,
  UnauthorizedBody,
  UserCreateBody,
  UserCreateResponse,
  UserWithNotificationsDTO,
} from '../dtos';

@Controller()
@ApiTags(SwaggerTags.AUTH)
export class AppController {
  constructor(
    private authService: AuthService,
    private createUser: CreateUser,
    private userRepository: UserRepository,
  ) {}

  @Post('auth/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginBody })
  @ApiOkResponse({ type: LoginResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedBody })
  async login(@Request() req: RequestType): Promise<LoginResponse> {
    return this.authService.login(req.user!);
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
  @ApiOkResponse({ type: UserWithNotificationsDTO })
  @ApiBearerAuth()
  async profile(
    @Request() req: RequestType,
  ): Promise<UserWithNotificationsDTO> {
    const user = await this.userRepository.findByIdWithNotifications(
      req.user!.id,
    );

    return user!;
  }
}
