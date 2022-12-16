import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import * as moment from 'moment';
import { UserLoginResponseDTO } from 'src/dto/user/user-login.response.dto';
import { UserSignupDTO } from 'src/dto/user/user-signup.dto';
import { UserSignupResponseDTO } from 'src/dto/user/user-signup.response.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { UserLoginDTO } from '../../dto/user/user-login.dto';
import { AuthResult } from './interface/auth.result.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: UserLoginDTO): Promise<AuthResult<UserLoginResponseDTO>> {
    // Validate DTO against validate function from class-validator
    const isOk = !(await validate(body)).length;

    if (isOk) {
      // Get user information
      const userDetails = await this.userRepository.findOne({
        where: { email: body.email },
      });

      if (!userDetails) {
        throw new BadRequestException('Invalid credentials');
      }

      // Check if the given password match with saved password
      const isValid = bcrypt.compareSync(body.password, userDetails.password);

      if (isValid) {
        return {
          status: 200,
          message: {
            email: body.email,
            type: 'bearer',
            access_token: await this.tokenService.generateAccessToken(userDetails),
            refresh_token: await this.tokenService.generateRefreshToken(
              userDetails,
              this.configService.get<number>('keys.expiresIn'),
            ),
            expires_in: moment()
              .add(this.configService.get<number>('keys.expiresIn'), 's')
              .format('YYYY-MM-DD HH:mm:ss'),
          } as UserLoginResponseDTO,
        };
      }
    }

    throw new BadRequestException('Invalid credentials');
  }

  async register(body: UserSignupDTO): Promise<AuthResult<UserSignupResponseDTO>> {
    const errors = await validate(body);

    console.debug({ errors });

    body.password = bcrypt.hashSync(body.password, 10);
    await this.userRepository.save(body);

    return { status: HttpStatus.CREATED, message: { message: `User created with success` } };
  }
}
