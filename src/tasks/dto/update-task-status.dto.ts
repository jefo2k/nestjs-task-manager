import { TaskStatus } from '../task.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Task status',
    enum: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus, { message: 'invalid status'})
  status: TaskStatus;
}