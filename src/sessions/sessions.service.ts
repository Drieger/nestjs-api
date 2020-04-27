import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Session } from '../entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService extends TypeOrmCrudService<Session> {
  constructor(@InjectRepository(Session) repo) {
    super(repo);
  }

  /**
   * This is a possible shortcut to avoid binding all necessary
   * repositories methods to the class, but is highly discouraged
   * unless you need to implement all of them
   */
  // public get repository(): Repository<Session> {
  //   return this.repo;
  // }

  public get findOneOrFail(): Repository<Session>['findOneOrFail'] {
    return this.repo.findOneOrFail.bind(this.repo);
  }

  public get save(): Repository<Session>['save'] {
    return this.repo.save.bind(this.repo);
  }

  public get delete(): Repository<Session>['delete'] {
    return this.repo.delete.bind(this.repo);
  }
}
