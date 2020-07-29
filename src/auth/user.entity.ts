import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { rejects } from 'assert';
import { resolve } from 'path';

@Entity()
@Unique(['userName'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'username'})
  userName: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

}