import { TaskStatus } from '../task.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus, { message: 'invalid status'})
  status: TaskStatus;
}