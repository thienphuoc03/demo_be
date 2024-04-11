import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  role_id: number;
}
