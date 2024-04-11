import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { createUserDto, signInDto, signUpDto, updateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientKafka,
  ) {}

  signUp(signUp: signUpDto) {
    return this.usersService.send('sign-up', signUp);
  }

  signIn(signIn: signInDto) {
    return this.usersService.send('sign-in', signIn);
  }

  getProfile(userId: number) {
    return this.usersService.send('get-user-by-id', userId);
  }

  getAllUser(limit: number) {
    return this.usersService.send('get-all-users', limit);
  }

  getUserById(id: number) {
    return this.usersService.send('get-user-by-id', id);
  }

  createUser(createUser: createUserDto) {
    return this.usersService.send('create-user', createUser);
  }

  updateUser(updateUser: updateUserDto, id: number) {
    return this.usersService.send('update-user', { updateUser, id });
  }

  deleteUser(id: number) {
    return this.usersService.send('delete-user', id);
  }
}
