import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import * as moment from 'moment';
import { UserRepository } from 'src/repositories/user.repository';
import { UserLoginDTO } from '../../dto/user-login.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: UserLoginDTO): Promise<Record<string, any>> {
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
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }

      // Check if the given password match with saved password
      const isValid = bcrypt.compareSync(body.password, userDetails.password);

      if (isValid) {
        return {
          status: 200,
          msg: {
            email: body.email,
            type: 'bearer',
            access_token: await this.tokenService.generateAccessToken(
              userDetails,
            ),
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
        return { status: 401, msg: { msg: 'Invalid credentials' } };
      }
    } else {
      return { status: 400, msg: { msg: 'Invalid fields.' } };
    }
  }

  async register(body: UserLoginDTO): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = true;

    body.password = bcrypt.hashSync(body.password, 10);

    // Validate DTO against validate function from class-validator
    await validate(body).then((errors) => {
      if (errors.length > 0) {
        console.debug(AuthService.name, errors);
        isOk = false;
      }
    });
    if (isOk) {
      await this.userRepository.save(body).catch((error) => {
        console.debug(error.message, AuthService.name);
        isOk = false;
      });

      if (isOk) {
        return { status: 201, content: { msg: `User created with success` } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
}
