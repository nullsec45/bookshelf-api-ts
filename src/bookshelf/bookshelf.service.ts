import { Injectable } from '@nestjs/common';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BookshelfService {
  constructor(private prisma: PrismaService) {

  }
  async create(createBookshelfDto: CreateBookshelfDto) {
    const { tanggal_terbit, user_id, ...bookShelfs } = createBookshelfDto;
    const iso8601Date = new Date(tanggal_terbit).toISOString();


    const createdData = await this.prisma.bookshelfs.create({
      data: {
        ...bookShelfs,
        user_id,
        tanggal_terbit: iso8601Date,
        is_completed: createBookshelfDto.is_completed.valueOf()
      }
    });

    return {
      statusCode: 200,
      data: createdData
    }
  }

  async findAll(userId: number) {
    const dataBookshelf = await this.prisma.bookshelfs.findMany({
      where: {
        user_id: userId
      }
    });

    return {
      statusCode: 200,
      data: dataBookshelf
    }
  }

  async findOne(id: number, userId: number) {
    const dataBookshelf = await this.prisma.bookshelfs.findFirst({
      where: {
        id: id,
        user_id: userId
      }
    });

    if (dataBookshelf == undefined) {
      return {
        statusCode: 404,
        message: "Book Not Found"
      }
    }

    return {
      statusCode: 200,
      data: dataBookshelf
    }
  }

  async update(id: number, userId: number, updateBookshelfDto: UpdateBookshelfDto) {
    const { tanggal_terbit, ...bookShelf } = updateBookshelfDto;
    const iso8601Date = new Date(tanggal_terbit).toISOString();

    const updateBookShelf = await this.prisma.bookshelfs.update({
      data: {
        ...bookShelf,
        tanggal_terbit: iso8601Date,
        is_completed: updateBookshelfDto.is_completed.valueOf()
      },
      where: {
        id: id,
        user_id: userId
      }
    })

    return {
      statusCode: 200,
      data: updateBookShelf,
    };
  }

  async remove(id: number, user_id: number) {
    const bookShelf = await this.prisma.bookshelfs.delete({
      where: {
        id: id,
        user_id
      },
    });
    return {
      statusCode: 200,
      message: `Success delete ${id}`,
    };
  }
}
