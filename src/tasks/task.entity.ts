import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  @JoinColumn({ name: "user_id" })
  user: User;

}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}