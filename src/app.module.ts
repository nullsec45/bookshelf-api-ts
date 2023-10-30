import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookshelfController } from './bookshelf/bookshelf.controller';
import { BookshelfService } from './bookshelf/bookshelf.service';

@Module({
  imports: [],
  controllers: [AppController, BookshelfController],
  providers: [AppService, BookshelfService],
})
export class AppModule {}
