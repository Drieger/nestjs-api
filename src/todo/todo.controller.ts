import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Todo } from '../entities/todo.entity';

@ApiTags('todo')
@Crud({
  model: {
    type: Todo,
  },
  query: {
    join: {
      createdBy: {
        allow: ['name'],
      },
    },
  },
})
@Controller('todos')
export class TodoController implements CrudController<Todo> {
  constructor(public service: TodoService) {}
}
