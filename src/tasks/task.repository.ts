import { Repository, EntityRepository, QueryBuilder } from "typeorm";
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async getTasks(
    filterDto: GetTasksFilteredDto,
    user: User
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.user.id = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    const tasks = query.getMany();
    return tasks;
  }
  
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    await task.save();

    delete task.user; // prevent return user data
    return task;
  }

}