import { Injectable } from '@nestjs/common';
import argon from 'argon2';

import { HashingService } from './hashing.service';

@Injectable()
export class ArgonService implements HashingService {
  async hash(payload: string | Buffer): Promise<string> {
    return argon.hash(payload);
  }

  async verify(payload: string | Buffer, hash: string): Promise<boolean> {
    return argon.verify(hash, payload);
  }
}
