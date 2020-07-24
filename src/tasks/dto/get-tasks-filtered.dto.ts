import { TaskStatus } from "../task.model";
import { IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

export class GetTasksFilteredDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'invalid status'})
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}