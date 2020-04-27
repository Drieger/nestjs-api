import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AuthService {
  constructor(
    private sessionsService: SessionsService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    try {
      // If user is not found it will reject the promise
      // and go to catch step
      const user = await this.userService.findByEmail(userEmail);
      if (user && (await bcrypt.compare(userPassword, user.password))) {
        const { id, email, isAdmin } = user;
        return { id, email, isAdmin };
      } else {
        return null;
      }
    } catch (err) {
      Logger.log(`User ${userEmail} was not found`);
      return null;
    }
  }

  // Checks if current JWT token is associated with an user
  async validateJwtUser(jwt: string): Promise<User> {
    try {
      const session = await this.sessionsService.findOneOrFail(
        { jwt },
        { select: ['jwt', 'userId'] },
      );

      // Checks if token is still valid
      // Checking it here allow us to remove this token from our session database
      this.jwtService.verify(jwt, { ignoreExpiration: false });

      const user = await this.userService.findOne(session.userId, {
        select: ['id', 'email', 'isAdmin'],
      });

      return user;
    } catch (err) {
      Logger.log(err);
      return null;
    }
  }

  async login(user: User, ip: string, userAgent: string) {
    const payload = { email: user.email, sub: user.id };
    const jwt = this.jwtService.sign(payload);

    try {
      await this.sessionsService.save({ jwt, user, ip, userAgent });
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
    return { accessToken: jwt };
  }

  async logout(jwt: string) {
    return this.sessionsService.delete({ jwt });
  }
}
