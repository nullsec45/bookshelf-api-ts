import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookshelfController } from './bookshelf/bookshelf.controller';
import { BookshelfService } from './bookshelf/bookshelf.service';
import { BookshelfModule } from './bookshelf/bookshelf.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtService } from '@nestjs/jwt/dist';


@Module({
  imports: [BookshelfModule, PrismaModule, AuthModule, UsersModule],
  controllers: [AppController, BookshelfController],
  providers: [AppService, BookshelfService, JwtService],
})
export class AppModule { }
