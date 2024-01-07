import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookshelfService } from './bookshelf.service';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthenticatedRequest } from 'typings';

@UseGuards(AuthenticatedGuard)
@UseGuards(JwtAuthGuard)
@Controller('bookshelf')
export class BookshelfController {
  constructor(private readonly bookshelfService: BookshelfService) { }


  @Post()
  async create(
    @Body() createBookshelfDto: CreateBookshelfDto,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;

    return await this.bookshelfService.create({
      ...createBookshelfDto,
      user_id: userId,
    });
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;
    return this.bookshelfService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;

    return this.bookshelfService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, @Body() updateBookshelfDto: UpdateBookshelfDto,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;

    return this.bookshelfService.update(+id, userId, updateBookshelfDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.sub;

    return this.bookshelfService.remove(+id, userId);
  }
}
