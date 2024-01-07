import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "src/users/users.service";
import { AuthDto } from './dto/auth.dto';
import { compare } from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { User } from '../../typings';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)

    if (user && (await compare(password, user.password))) {
      const { password, created_at, updated_at, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.name,
    };

    return this.jwtService.sign(payload);

    // throw new UnauthorizedException();
  }
}

