import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './types/types';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UserService {
  private readonly users: Map<string, User> = new Map();

  private cleanPassword(user: User) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findAll() {
    const users = Array.from(this.users.values());
    const usersWithoutPassword = users.map(this.cleanPassword);
    return usersWithoutPassword;
  }

  findOne(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return this.cleanPassword(user);
  }

  create(createUser: CreateUserDto) {
    const id = v4();
    const timestamp = Date.now();
    const newUser = {
      id,
      ...createUser,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.set(id, newUser);

    return this.cleanPassword(newUser);
  }

  update(id: string, updatePassword: UpdatePasswordDto) {
    const currentUser = this.users.get(id);

    if (!currentUser) {
      throw new NotFoundException(`User not found`);
    }

    if (currentUser.password !== updatePassword.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }

    const timestamp = Date.now();

    const updateUser = {
      ...currentUser,
      version: currentUser.version + 1,
      updatedAt: timestamp,
    };

    this.users.set(id, {
      ...updateUser,
      password: updatePassword.newPassword,
    });

    return this.cleanPassword(updateUser);
  }

  delete(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    this.users.delete(id);
  }
}
