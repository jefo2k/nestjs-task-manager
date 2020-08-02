import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {
  @ApiProperty({
    description: 'User \'s username',
    type: String
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'User \'s password',
    type: String
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;
}