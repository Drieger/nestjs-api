import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../src/entities/user.entity';

export class AddInitialUser1587325359027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    // Basic user information
    user.name = 'Admin';
    user.email = 'admin@admin.com';
    user.password = 'admin';
    user.isAdmin = true;

    await getRepository('users').save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository('users').delete({ email: 'admin@admin.com' });
  }
}
