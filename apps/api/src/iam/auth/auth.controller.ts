import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './services';
import { Public } from './decorators';

import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from './dto';

@ApiTags('IAM')
@Public()
@Controller('iam/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterResponse })
  @Post('/register')
  register(@Body() body: RegisterRequest) {
    return this.authService.register(body);
  }

  @ApiResponse({ status: HttpStatus.OK, type: LoginResponse })
  @Public()
  @Post('/login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }

  @ApiResponse({ status: HttpStatus.OK, type: RefreshResponse })
  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refresh(@Body() body: RefreshRequest) {
    return this.authService.refresh(body);
  }
}
