import { Injectable } from '@nestjs/common';
import { CreateBookshelfDto } from './dto/create-bookshelf.dto';
import { UpdateBookshelfDto } from './dto/update-bookshelf.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class BookshelfService {
  constructor(private prisma: PrismaService) {

  }
  async create(createBookshelfDto: CreateBookshelfDto) {
    const { TanggalTerbit, ...bookShelf } = createBookshelfDto;
    const iso8601Date = new Date(TanggalTerbit).toISOString();


    const createdData = await this.prisma.bookshelf.create({
      data: {
        ...bookShelf,
        TanggalTerbit: iso8601Date,
        IsCompleted: createBookshelfDto.IsCompleted.valueOf()
      }
    });

    return {
      statusCode: 200,
      data: createdData
    }
  }

  async findAll() {
    const dataBookshelf = await this.prisma.bookshelf.findMany({});

    return {
      statusCode: 200,
      data: dataBookshelf
    }
  }

  async findOne(id: number) {
    const dataBookshelf = await this.prisma.bookshelf.findFirst({
      where: {
        Id: id,
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
    const { TanggalTerbit, ...bookShelf } = updateBookshelfDto;
    const iso8601Date = new Date(TanggalTerbit).toISOString();

    const updateBookShelf = await this.prisma.bookshelf.update({
      data: {
        ...bookShelf,
        TanggalTerbit: iso8601Date,
        IsCompleted: updateBookshelfDto.IsCompleted.valueOf()
      },
      where: {
        Id: id,
      }
    })

    return {
      statusCode: 200,
      data: updateBookShelf,
    };
  }

  async remove(id: number) {
    const bookShelf = await this.prisma.bookshelf.delete({
      where: {
        Id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Success delete ${id}`,
    };
  }
}
