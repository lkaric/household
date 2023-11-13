interface RefreshTokenPayload {
  id: string;
}

interface RefreshToken {
  sub: string;
  id: string;
}

export type { RefreshToken, RefreshTokenPayload };
