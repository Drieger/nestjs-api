import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { IsOptional, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import * as bcrypt from 'bcrypt';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  @Column({ nullable: false })
  name?: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsEmail({}, { always: true })
  @Column({ nullable: false, unique: true })
  email?: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @CreateDateColumn({ select: false })
  createdAt?: string;

  @UpdateDateColumn({ select: false })
  updatedAt?: string;

  @Column({ nullable: false })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      process.env.SALT_ROUNDS || 10,
    );
  }
}
