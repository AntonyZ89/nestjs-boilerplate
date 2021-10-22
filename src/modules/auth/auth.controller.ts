import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as moment from 'moment';
import { RefreshTokenRefreshDTO } from 'src/dto/refreshToken-refresh.dto';
import { UserLoginDTO } from 'src/dto/user-login.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from './auth.service';
import { AuthRequest } from './interface/auth.request.interface';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { TokenService } from './token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private tokenService: TokenService,
    private userRepository: UserRepository,
  ) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 200, description: 'Successful.', type: User })
  async me(@Req() req: AuthRequest): Promise<User> {
    const userId = req.user.id;

    return await this.userRepository.findOne(userId);
  }

  @Post('login')
  async login(@Res() res: Response, @Body() body: UserLoginDTO) {
    const auth = await this.authService.login(body);

    res.status(auth.status).json(auth.message);
  }

  @Post('register')
  async register(@Res() res: Response, @Body() body: UserLoginDTO) {
    const auth = await this.authService.register(body);
    res.status(auth.status).json(auth.message);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Refresh Token' })
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
