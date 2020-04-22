import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Todo } from './todo.entity';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password?: string;

  @ApiProperty()
  @Column({ default: false })
  isAdmin?: boolean;

  @OneToMany(
    type => Todo,
    todo => todo.createdBy,
  )
  todos: Todo[];

  @CreateDateColumn({ select: false })
  createdAt?: string;

  @UpdateDateColumn({ select: false })
  updatedAt?: string;
}
