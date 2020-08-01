import { Controller, Post, Body, ValidationPipe, HttpCode, Req, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @Post('/test') // testing guards
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}