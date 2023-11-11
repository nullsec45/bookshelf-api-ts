import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from "src/users/users.service";
import { AuthDto } from './dto/auth.dto';
import { compare } from "bcryptjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email)

    if (user && (await compare(user.password, password))) {
      const { email, password, ...result } = user;
      return user;
    }

    return null;
  }

  async login(authDto: AuthDto) {
    const user = await this.userService.findByEmail(authDto.email)

    if (user && (await compare(authDto.password, user.password))) {
      const { password, ...result } = user;
      const payload = { sub: result.id, username: result.email }
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: 'Ayamgoreng77',
          expiresIn: '60S'
        })
      }
    };

    throw new UnauthorizedException();
  }
}

