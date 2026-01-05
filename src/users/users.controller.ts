import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsers(): string {
    return this.usersService.getUsers();
  }

  @Get(':id')
  findUser(@Param('id') id: string): string {
    return `User with ID ${id}`;
  }

  @Post()
  addUser(@Body() user: object): string {
    return `User added: ${JSON.stringify(user)}`;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string): string {
    return `User with ID ${id} updated successfully`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    return `User with ID ${id} deleted successfully`;
  }
}
