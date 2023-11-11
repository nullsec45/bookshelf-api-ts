import { Injectable } from '@nestjs/common';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BookshelfService {
  constructor(private prisma: PrismaService) {

  }
  async create(createBookshelfDto: CreateBookshelfDto) {
    const { tanggal_terbit, ...bookShelfs } = createBookshelfDto;
    const iso8601Date = new Date(tanggal_terbit).toISOString();


    const createdData = await this.prisma.bookshelfs.create({
      data: {
        ...bookShelfs,
        tanggal_terbit: iso8601Date,
        is_completed: createBookshelfDto.is_completed.valueOf()
      }
    });

    return {
      statusCode: 200,
      data: createdData
    }
  }

  async findAll() {
    const dataBookshelf = await this.prisma.bookshelfs.findMany({});

    return {
      statusCode: 200,
      data: dataBookshelf
    }
  }

  async findOne(id: number) {
    const dataBookshelf = await this.prisma.bookshelfs.findFirst({
      where: {
        id: id,
      }
    });

    if (dataBookshelf == undefined) {
      return {
        statusCode: 404,
        message: "Book Not Found"
        // data: dataBookshelf
      }
    }
    return {
      statusCode: 200,
      data: dataBookshelf
    }
  }

  async update(id: number, updateBookshelfDto: UpdateBookshelfDto) {
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
      }
    })

    return {
      statusCode: 200,
      data: updateBookShelf,
    };
  }

  async remove(id: number) {
    const bookShelf = await this.prisma.bookshelfs.delete({
      where: {
        id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Success delete ${id}`,
    };
  }
}
