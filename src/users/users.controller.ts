import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsers(
    @Query('position') position?: 'Left Wing' | 'Mid-Field' | 'Right Wing',
  ): object[] {
    return this.usersService.getUsers(position);
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUser(id);
  }

  @Post()
  addUser(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ): object {
    return this.usersService.addUser(user);
  }

  //To update user, use URL/id with PATCH
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): string {
    return this.usersService.deleteUser(id);
  }
}
