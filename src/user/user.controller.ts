import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.findOne(uuid);
  }

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    return this.userService.update(uuid, updatePassword);
  }

  @Delete(':uuid')
  @HttpCode(204)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.delete(uuid);
  }
}
