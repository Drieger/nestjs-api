import {
  Controller,
  UseGuards,
  Get,
  Request,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { Crud, CrudController, CrudAuth } from '@nestjsx/crud';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { UpdateUserDTO } from './dtos/Updateuser.dto';

@ApiTags('users')
@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    getManyBase: {
      decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    deleteOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
    getOneBase: {
      decorators: [ApiBearerAuth(), UseGuards(JwtAuthGuard)],
    },
  },
  query: {
    exclude: ['password'],
  },
  dto: {
    create: CreateUserDTO,
    update: UpdateUserDTO,
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => (!user || user.isAdmin ? {} : { id: user.id }),
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
