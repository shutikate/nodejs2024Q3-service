import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUser: CreateUserDto) {
    const { password, login } = createUser;
    const cryptSalt = this.configService.get('CRYPT_SALT');
    const hash = await bcrypt.hash(password, +cryptSalt);
    const user = await this.userService.create({ login, password: hash });
    return user;
  }

  async signIn(login: string, password: string) {
    const user = await this.userService.findByUsername(login);
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, login: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
