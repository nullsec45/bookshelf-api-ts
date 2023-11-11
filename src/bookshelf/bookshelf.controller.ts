import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookshelfService } from './bookshelf.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';


@Controller('bookshelf')
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) { }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBookshelfDto: CreateBookshelfDto) {
    return await this.bookshelfService.create(createBookshelfDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.bookshelfService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookshelfService.findOne(+id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookshelfDto: UpdateBookshelfDto) {
    return this.bookshelfService.update(+id, updateBookshelfDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookshelfService.remove(+id);
  }
}
