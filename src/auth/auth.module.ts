import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: '_lGW9o_INFnKyL1thEwAQt8Uii90_YYM37T3ET0Sfr0gyZmaYEveC0E0UWJH_3WC_VRoaV6GwR6xicWhQaZhMuN9FRKW99Z7yyKhD4gfr1S0gVEmv4Sahpjzs0yqHvlW3kgty1LBQ6B6iNZQRvAKXdaVwQ-LCl5yWBTrOsvg62s',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
