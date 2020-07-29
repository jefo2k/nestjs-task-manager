import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; 

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.userName = username;
    user.password = await this.hashPassword(password);

    try {
      await user.save();      
    } catch (error) {
      if (error.code === '23505') { // duplicated username
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

  }

  private async hashPassword(plainTextPassword: string): Promise<string> {
    // TODO: refactor - move to a commons lib
    const saltRounds: number = 11;
    const salt: string = await bcrypt.genSalt(saltRounds);

    const hashPassword: string = await bcrypt.hash(plainTextPassword, salt);
    return hashPassword
  }
}