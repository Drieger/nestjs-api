import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity('sessions')
export class Session {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiResponseProperty()
  @Column({ nullable: true })
  ip: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  userAgent: string;

  @ApiResponseProperty()
  @CreateDateColumn()
  createdAt: string;

  @Column({ unique: true })
  jwt: string;

  @ManyToOne(type => User, { cascade: true })
  user: User;

  @Column({ nullable: true })
  userId: number;
}
