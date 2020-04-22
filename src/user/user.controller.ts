import { Controller, UseGuards, Get, Request, Logger } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: User,
  },
  query: {
    exclude: ['password', 'createdAt', 'updatedAt'],
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Get('/me')
  async whoAmI(@Request() req) {
    return this.service.findOne(req.user.id);
  }
}
