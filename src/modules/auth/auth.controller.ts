import { Body, Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { RefreshTokenRefreshDTO } from 'src/dto/refreshToken-refresh.dto';
import { UserLoginDTO } from 'src/dto/user-login.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

export interface AuthenticationPayload {
  user: User;
  payload: {
    type: string;
    token: string;
    refresh_token?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  @Post('login')
  async login(@Res() res, @Body() body: UserLoginDTO) {
    const auth = await this.authService.login(body);

    res.status(auth.status).json(auth.msg);
  }

  @Post('register')
  async register(@Res() res, @Body() body: UserLoginDTO) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.content);
  }

  @Post('refresh')
  public async refresh(@Body() body: RefreshTokenRefreshDTO) {
    const { user, token } =
      await this.tokenService.createAccessTokenFromRefreshToken(
        body.refresh_token,
      );

    return {
      email: user.email,
      type: 'bearer',
      access_token: token,
      expires_in: moment()
        .add(this.configService.get<number>('keys.expiresIn'), 's')
        .format('YYYY-MM-DD HH:mm:ss'),
    };
  }
}
