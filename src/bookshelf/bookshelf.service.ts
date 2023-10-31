import { Injectable } from '@nestjs/common';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';

@Injectable()
export class BookshelfService {
  create(createBookshelfDto: CreateBookshelfDto) {
    return 'This action adds a new bookshelf';
  }

  findAll() {
    return `This action returns all bookshelf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookshelf`;
  }

  update(id: number, updateBookshelfDto: UpdateBookshelfDto) {
    return `This action updates a #${id} bookshelf`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookshelf`;
  }
}
