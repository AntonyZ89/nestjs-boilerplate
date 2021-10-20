import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as moment from 'moment';
import { RefreshTokenRefreshDTO } from 'src/dto/refreshToken-refresh.dto';
import { UserLoginDTO } from 'src/dto/user-login.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from './auth.service';
import { AuthRequest } from './interface/request.auth';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { TokenService } from './token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private tokenService: TokenService,
    private userRepository: UserRepository,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: AuthRequest) {
    const userId = req.user.id;

    return await this.userRepository.findOne(userId);
  }

  @Post('login')
  async login(@Res() res: Response, @Body() body: UserLoginDTO) {
    const auth = await this.authService.login(body);

    res.status(auth.status).json(auth.msg);
  }

  @Post('register')
  async register(@Res() res: Response, @Body() body: UserLoginDTO) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.content);
  }

  @Post('refresh')
  public async refresh(@Body() body: RefreshTokenRefreshDTO) {
    const { user, token } = await this.tokenService.createAccessTokenFromRefreshToken(body.refresh_token);

    return {
      email: user.email,
      type: 'bearer',
      access_token: token,
      expires_in: moment().add(this.configService.get<number>('keys.expiresIn'), 's').format('YYYY-MM-DD HH:mm:ss'),
    };
  }
}
