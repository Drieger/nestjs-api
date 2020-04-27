import { Controller, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CrudController, Crud, CrudAuth } from '@nestjsx/crud';
import { Session } from '../entities/session.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';

// Api documentation
@ApiTags('sessions')
@ApiBearerAuth()
// Crud restrictions
@Crud({
  model: {
    type: Session,
  },
  routes: {
    only: ['getManyBase', 'deleteOneBase'],
  },
  query: {
    exclude: ['userId'],
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => ({ userId: user.id }),
})
// Authorization
@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController implements CrudController<Session> {
  constructor(public service: SessionsService) {}
}
