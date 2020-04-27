import {
  Controller,
  Request,
  Res,
  Post,
  UseGuards,
  Headers,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/localAuth.guard';
import {
  ApiTags,
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { ExtractJwt } from 'passport-jwt';
import { LoginDTO } from './dtos/Login.dto';
import { LoginResponseDTO } from './dtos/LoginResponse.dto';
import { UnauthorizedResponseDTO } from './dtos/UnauthorizedResponse.dto';
import { LogoutResponseDTO } from './dtos/LogoutResponse.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  // Api documentation
  @ApiBasicAuth()
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ type: LoginResponseDTO })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDTO })
  // Authorization
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Headers() headers) {
    return this.service.login(req.user, req.ip, headers['user-agent']);
  }

  // Api documentation
  @ApiBearerAuth()
  @ApiOkResponse({ type: LogoutResponseDTO })
  // Authorization
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    await this.service.logout(jwt);
    return res
      .status(HttpStatus.OK)
      .json({ statusCode: HttpStatus.OK, success: true });
  }
}
