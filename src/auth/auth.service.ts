import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    try {
      // If user is not found it will reject the promise
      // and go to catch step
      const user = await this.userService.findByEmail(userEmail);
      if (user && (await bcrypt.compare(userPassword, user.password))) {
        const { id, email } = user;
        return { id, email };
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
      const session = await this.sessionRepository.findOneOrFail(
        { jwt },
        { relations: ['user'] },
      );

      // Checks if token is still valid
      // Checking it here allow us to remove this token from our session database
      this.jwtService.verify(jwt, { ignoreExpiration: false });

      const user = await this.userService.findOne(session.user, {
        select: ['id', 'email'],
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
      await this.sessionRepository.save({ jwt, user, ip, userAgent });
    } catch (err) {
      Logger.error(err);
      throw new UnauthorizedException();
    }
    return { accessToken: jwt };
  }

  async logout(jwt: string) {
    return this.sessionRepository.delete({ jwt });
  }

  async sessions(user: User) {
    return this.sessionRepository.find({ user });
  }
}
