import { IsJWT } from 'class-validator';

import type { TokenPair } from '../interfaces';

export class RefreshRequest {
  @IsJWT()
  refreshToken: string;
}

export class RefreshResponse implements TokenPair {
  accessToken: string;

  refreshToken: string;
}
