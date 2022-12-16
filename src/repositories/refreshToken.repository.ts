import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/entities/refreshToken.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(@InjectRepository(RefreshToken) repository: Repository<RefreshToken>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const token = new RefreshToken();

    token.userId = user.id;
    token.revoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return this.save(token);
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.findOne({ where: { id } });
  }
}
