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
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  query: {
    exclude: ['password', 'createdAt'],
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
