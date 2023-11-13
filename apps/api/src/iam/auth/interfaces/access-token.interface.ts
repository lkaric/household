interface AccessTokenPayload {
  email: string;
}

interface AccessToken {
  sub: string;
  email: string;
}

export type { AccessToken, AccessTokenPayload };
