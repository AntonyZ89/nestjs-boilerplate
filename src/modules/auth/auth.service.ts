import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import * as moment from 'moment';
import { UserRepository } from 'src/repositories/user.repository';
import { UserLoginDTO } from '../../dto/user-login.dto';
import { AuthResult } from './interface/auth.result.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: UserLoginDTO): Promise<AuthResult> {
    // Validation Flag
    let isOk = true;

    // Validate DTO against validate function from class-validator
    await validate(body).then((errors) => {
      if (errors.length > 0) {
        console.debug(AuthService.name, errors);
        isOk = false;
      }
    });

    if (isOk) {
      // Get user information
      const userDetails = await this.userRepository.findOne({
        email: body.email,
      });

      if (!userDetails) {
        return { status: HttpStatus.UNAUTHORIZED, message: { msg: 'Invalid credentials' } };
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
          },
        };
      } else {
        return { status: HttpStatus.UNAUTHORIZED, message: { msg: 'Invalid credentials' } };
      }
    } else {
      return { status: HttpStatus.BAD_REQUEST, message: { msg: 'Invalid fields.' } };
    }
  }

  async register(body: UserLoginDTO): Promise<AuthResult> {
    try {
      body.password = bcrypt.hashSync(body.password, 10);
      await this.userRepository.save(body);

      return { status: HttpStatus.CREATED, message: { msg: `User created with success` } };
    } catch (error) {
      return { status: HttpStatus.BAD_REQUEST, message: { msg: 'Invalid content' } };
    }
  }
}
