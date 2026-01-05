import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    return 'List of users';
  }

  UsersOne(): string {
    return 'I am User number one';
  }

  addUser(): string {
    return 'User added successfully';
  }

  updateUser(): string {
    return 'User updated successfully';
  }

  deleteUser(): string {
    return 'User deleted successfully';
  }
}
