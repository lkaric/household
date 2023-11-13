import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(payload: string | Buffer): Promise<string>;

  abstract verify(payload: string | Buffer, hash: string): Promise<boolean>;
}
