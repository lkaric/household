import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import type { TokenPair } from '../interfaces';

export class RefreshRequest {
  @ApiProperty({ description: 'Refresh Token' })
  @IsJWT()
  refreshToken: string;
}

export class RefreshResponse implements TokenPair {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;
}
