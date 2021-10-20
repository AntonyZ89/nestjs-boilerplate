import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: Error, user: any, info: Error) {
    if (err || info || !user) {
      throw new UnauthorizedException(err?.message || info?.message);
    }

    return user;
  }
}
