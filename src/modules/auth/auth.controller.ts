import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as moment from 'moment';
import { RefreshTokenDTO } from 'src/dto/auth/refresh-token.dto';
import { UserLoginDTO } from 'src/dto/user/user-login.dto';
import { UserLoginResponseDTO } from 'src/dto/user/user-login.response.dto';
import { UserMeDTO } from 'src/dto/user/user-me.dto';
import { UserSignupDTO } from 'src/dto/user/user-signup.dto';
import { UserSignupResponseDTO } from 'src/dto/user/user-signup.response.dto';
import { IBadRequestException } from 'src/exceptions/IBadRequestException';
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
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.', type: UnauthorizedException })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful.', type: UserMeDTO })
  async me(@Req() req: AuthRequest): Promise<UserMeDTO> {
    const userId = req.user.id;

    return await this.userRepository.findOne(userId);
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.', type: IBadRequestException })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful.', type: UserLoginResponseDTO })
  async login(@Res() res: Response, @Body() body: UserLoginDTO) {
    const { status, message } = await this.authService.login(body);

    res.status(status).json(message);
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error', type: InternalServerErrorException })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.', type: IBadRequestException })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful.', type: UserSignupResponseDTO })
  async register(@Res() res: Response, @Body() body: UserSignupDTO) {
    const { status, message } = await this.authService.register(body);

    res.status(status).json(message);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Refresh Token' })
  public async refresh(@Body() body: RefreshTokenDTO) {
    const { user, token } = await this.tokenService.createAccessTokenFromRefreshToken(body.refresh_token);

    return {
      email: user.email,
      type: 'bearer',
      access_token: token,
      expires_in: moment().add(this.configService.get<number>('keys.expiresIn'), 's').format('YYYY-MM-DD HH:mm:ss'),
    };
  }
}
