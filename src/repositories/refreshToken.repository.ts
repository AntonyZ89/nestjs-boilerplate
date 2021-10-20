import { RefreshToken } from 'src/entities/refreshToken.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const token = new RefreshToken();

    token.userId = user.id;
    token.revoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return this.save(token);
  }

  public async findTokenById(id: number): Promise<RefreshToken | undefined> {
    return this.findOne(id);
  }
}
