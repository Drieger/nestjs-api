import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiResponseProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiResponseProperty()
  @Column({ type: 'varchar' })
  name?: string;

  @ApiPropertyOptional()
  @Column({ unique: true, type: 'varchar' })
  email?: string;

  @Column({ default: false, type: 'boolean' })
  isAdmin?: boolean;

  @ApiResponseProperty()
  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;

  @Column({ type: 'varchar' })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      process.env.SALT_ROUNDS || 10,
    );
  }
}
