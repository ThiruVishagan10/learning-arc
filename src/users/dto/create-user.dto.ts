import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['Left Wing', 'Mid-Field', 'Right Wing'], {
    message:
      'Position must be one of the following: Left Wing, Mid-Field, Right Wing',
  })
  position: 'Left Wing' | 'Mid-Field' | 'Right Wing';
}
