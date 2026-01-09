import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice', position: 'Left Wing' },
    { id: 2, name: 'Bob', position: 'Mid-Field' },
    { id: 3, name: 'Charlie', position: 'Right Wing' },
    { id: 4, name: 'David', position: 'Left Wing' },
    { id: 5, name: 'Eve', position: 'Mid-Field' },
    { id: 6, name: 'Frank', position: 'Right Wing' },
    { id: 7, name: 'Cristiano Ronaldo', position: 'Left Wing' },
    { id: 8, name: 'Henry', position: 'Mid-Field' },
    { id: 9, name: 'Ivy', position: 'Right Wing' },
    { id: 10, name: 'Thiru Vishagan', position: 'Left Wing' },
  ];

  getUsers(position?: 'Left Wing' | 'Mid-Field' | 'Right Wing'): object[] {
    if (position) {
      const validPositions = ['Left Wing', 'Mid-Field', 'Right Wing'];
      if (!validPositions.includes(position)) {
        throw new NotFoundException('Position not found in the list');
      }
      return this.users.filter((user) => user.position === position);
    }
    return this.users;
  }

  findUser(id: number): object {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  addUser(user: CreateUserDto): object {
    // Check if only name and position are provided
    const allowedKeys = ['name', 'position'];
    const userKeys = Object.keys(user);

    const extraKeys = userKeys.filter((key) => !allowedKeys.includes(key));
    if (extraKeys.length > 0) {
      throw new BadRequestException(
        `Invalid fields: ${extraKeys.join(', ')}. Only 'name' and 'position' are allowed.`,
      );
    }

    const newId = Math.max(...this.users.map((u) => u.id)) + 1;

    const newUser = {
      id: newId,
      name: user.name,
      position: user.position,
    };

    this.users.push(newUser);
    console.log('Current users:', this.users.length);
    return newUser;
  }

  //To update user, use URL/id with PATCH
  updateUser(id: number, user: UpdateUserDto): object {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }

    // Check for invalid fields
    const allowedKeys = ['name', 'position'];
    const userKeys = Object.keys(user);
    const extraKeys = userKeys.filter((key) => !allowedKeys.includes(key));
    if (extraKeys.length > 0) {
      throw new BadRequestException(
        `Invalid fields: ${extraKeys.join(', ')}. Only 'name' and 'position' are allowed.`,
      );
    }

    // Update user data
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...user,
    };

    return {
      message: `User with ID ${id} updated successfully`,
      user: this.users[userIndex],
    };
  }

  deleteUser(id: number): string {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
    return `User with ID ${id} deleted successfully`;
  }
}
