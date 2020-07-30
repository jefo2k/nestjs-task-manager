import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['userName'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'username'})
  userName: string;

  @Column()
  password: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

}