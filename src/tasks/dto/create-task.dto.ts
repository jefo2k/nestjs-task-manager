import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title\'s task',
    type: String
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description\'s task',
    type: String
  })
  @IsNotEmpty()
  description: string;
}