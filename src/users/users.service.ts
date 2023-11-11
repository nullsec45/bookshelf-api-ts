import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from "bcryptjs";


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async register(createUserDto: CreateUserDto) {
    const checkEmail = await this.findByEmail(createUserDto.email);

    if (checkEmail) {
      throw new ConflictException("email duplicated");
    }

    const newUser = await this.prisma.users.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      }
    });
    const { password, ...user } = newUser;

    return user;
  }

  async findByEmail(email: string) {
    const emailUser = await this.prisma.users.findUnique({
      where: {
        email,
      }
    })

    return emailUser;

  }
  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      }
    })

    if (user) {
      return user;
    }
    throw new NotFoundException("data user tidak ditemukan");

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
