import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './types/types';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private cleanPassword(user: User) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    const usersWithoutPassword = users.map((user) =>
      this.cleanPassword({
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      }),
    );

    return usersWithoutPassword;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return this.cleanPassword({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
  }

  async findByUsername(login: string) {
    const user = await this.prisma.user.findFirst({
      where: { login },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async create(createUser: CreateUserDto) {
    const id = v4();
    const date = new Date();
    const newUser = {
      id,
      ...createUser,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    const user = await this.prisma.user.create({ data: newUser });

    return this.cleanPassword({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
  }

  async update(id: string, updatePassword: UpdatePasswordDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { id } });

    if (!currentUser) {
      throw new NotFoundException(`User not found`);
    }

    if (currentUser.password !== updatePassword.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    const timestamp = new Date();

    const updateUser = {
      ...currentUser,
      password: updatePassword.newPassword,
      version: currentUser.version + 1,
      updatedAt: timestamp,
    };

    const user = await this.prisma.user.update({
      data: updateUser,
      where: { id },
    });

    return this.cleanPassword({
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
