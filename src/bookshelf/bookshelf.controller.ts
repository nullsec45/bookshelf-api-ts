import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookshelfService } from './bookshelf.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';

@Controller('bookshelf')
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) {}

  @Post()
  create(@Body() createBookshelfDto: CreateBookshelfDto) {
    return this.bookshelfService.create(createBookshelfDto);
  }

  @Get()
  findAll() {
    return this.bookshelfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookshelfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookshelfDto: UpdateBookshelfDto) {
    return this.bookshelfService.update(+id, updateBookshelfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookshelfService.remove(+id);
  }
}
