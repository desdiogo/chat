import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UnauthorizedError } from '../../../errors/types/unauthorized.error';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.hasUser(createUserDto.email);

    if (user) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        emailVerifiedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        hashRefreshToken: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        emailVerifiedAt: true,
        name: true,
      },
    });
  }

  async updateEmailVerifiedAt(id: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        emailVerifiedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        emailVerifiedAt: true,
        name: true,
      },
    });
  }

  async updateHashRefreshToken(
    id: string,
    hashRefreshToken: string | null = null,
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashRefreshToken,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        emailVerifiedAt: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        emailVerifiedAt: true,
      },
    });
  }

  async hasUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        emailVerifiedAt: true,
      },
    });

    return !!user;
  }
}
