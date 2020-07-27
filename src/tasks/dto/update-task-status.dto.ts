import { TaskStatus } from '../task.model';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus, { message: 'invalid status'})
  status: TaskStatus;
}