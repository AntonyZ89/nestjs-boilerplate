import { SwaggerTags } from '@/enums';
import { UserRepository } from '@application/repositories';
import { CreateUser, UpdateUser } from '@application/use-cases/user';
import { AuthService } from '@infra/auth/auth.service';
import { LocalAuthGuard } from '@infra/auth/guards';
import { Public } from '@infra/http/decorators';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
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
  ResponseBody,
  UnauthorizedBody,
  UserCreateBody,
  UserCreateResponse,
  UserUpdateBody,
  UserWithNotificationsDTO,
} from '../dtos';

@Controller()
@ApiTags(SwaggerTags.AUTH)
export class AppController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
    private createUser: CreateUser,
    private updateUser: UpdateUser,
  ) {}

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
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
    await this.createUser.execute(body);

    return {
      message: 'Cadastrado com sucesso.',
    };
  }

  @Get('profile')
  @ApiOkResponse({ type: UserWithNotificationsDTO })
  @ApiBearerAuth()
  async getProfile(
    @Request() req: RequestType,
  ): Promise<UserWithNotificationsDTO> {
    const user = await this.userRepository.findByIdWithNotifications(
      req.user!.id,
    );

    return user!;
  }

  @Put('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseBody })
  @ApiBody({ type: UserUpdateBody })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async updateProfile(
    @Request() req: RequestType,
    @Body() body: UserUpdateBody,
  ): Promise<ResponseBody> {
    await this.updateUser.execute({
      userId: req.user!.id,
      data: body,
    });

    return {
      message: 'Atualizado com sucesso',
    };
  }
}
