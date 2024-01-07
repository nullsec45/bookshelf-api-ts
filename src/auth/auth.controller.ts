import { Controller, Post, Body, UseGuards, Get, Req, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: any) {
    const accessToken = await this.authService.login(req.user);

    return {
      data: {
        accessToken,
      },
      statusCode: HttpStatus.OK,
      message: 'login successfully',
    };
  }
}
