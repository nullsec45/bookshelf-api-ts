import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';



@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: "Ayamgoreng77",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, JwtStrategy],
})
export class AuthModule { }
