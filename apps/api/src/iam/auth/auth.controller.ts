import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './services';
import { Public } from './decorators';

import { RegisterRequest, LoginRequest, RefreshRequest } from './dto';

@Public()
@Controller('iam/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterRequest) {
    return this.authService.register(body);
  }

  @Public()
  @Post('/login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }

  @Post('/refresh')
  refresh(@Body() body: RefreshRequest) {
    return this.authService.refresh(body);
  }
}
