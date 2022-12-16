import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('keys.publicKey'),
      algorithms: ['RS256'],
      signOptions: {
        expiresIn: configService.get<string>('keys.expiresIn'),
      },
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: payload.sub } });
  }
}
