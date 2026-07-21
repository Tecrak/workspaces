import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Щось закоротка пошта' })
  @MinLength(5)
  email!: string;
  @MinLength(5)
  password!: string;
}
export interface UserCreatedEvent {
  id: string;
  email: string;
}
