import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { ExtractJwt } from 'passport-jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.service.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Request() req) {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    await this.service.logout(req.user, jwt);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async sessions(@Request() req) {
    return this.service.sessions(req.user);
  }
}
