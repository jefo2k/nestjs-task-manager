import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { table } from 'console';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(
    filterDto: GetTasksFilteredDto,
    user: User
  ): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  // getTasksWithFilter(filterDto: GetTasksFilteredDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(task => 
  //       task.title.includes(search) ||
  //       task.description.includes(search)
  //     )
  //   }

  //   return tasks;
  // }

  async getTaskById(
    id: string,
    user: User
    ): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(
    id: string,
    user: User
  ): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string, 
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.getTaskById(id, user);  // Throws NotFoundException if task does not exist

    task.status = status;
    await task.save();

    return task;
  }
}
