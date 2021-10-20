import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRefreshDTO {
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string;
}
