import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: any): Promise<any> {
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const user = await this.authService.validateJwtUser(jwt);

    if (!user) {
      throw new UnauthorizedException();
    } else {
      // User has only is {id, email}
      return user;
    }
  }
}
