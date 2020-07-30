import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '_lGW9o_INFnKyL1thEwAQt8Uii90_YYM37T3ET0Sfr0gyZmaYEveC0E0UWJH_3WC_VRoaV6GwR6xicWhQaZhMuN9FRKW99Z7yyKhD4gfr1S0gVEmv4Sahpjzs0yqHvlW3kgty1LBQ6B6iNZQRvAKXdaVwQ-LCl5yWBTrOsvg62s'
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = this.userRepository.findOne({ where: { userName: username }});

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}