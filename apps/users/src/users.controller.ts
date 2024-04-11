import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { signInRequest, signUpRequest, updateUserResquest } from './dto';
import { createUserDto } from '../../api-gateway/src/users/dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('sign-up')
  signUp(@Payload() payload: signUpRequest) {
    return this.usersService.signUp(payload);
  }

  @MessagePattern('sign-in')
  signIn(@Payload() payload: signInRequest) {
    return this.usersService.signIn(payload);
  }

  @MessagePattern('get-all-users')
  getAllUser(@Payload() limit: number): Observable<any> {
    return this.usersService.getAllUser(+limit);
  }

  @MessagePattern('get-user-by-id')
  getUserById(@Payload() id: number) {
    return this.usersService.getUserById(+id);
  }

  @MessagePattern('create-user')
  createUser(@Payload() payload: createUserDto) {
    return this.usersService.createUser(payload);
  }

  @MessagePattern('update-user')
  updateUser(
    @Payload() payload: { updateUser: updateUserResquest; id: number },
  ) {
    const { updateUser, id } = payload;

    return this.usersService.updateUser(updateUser, id);
  }

  @MessagePattern('delete-user')
  deleteUser(@Payload() id: number) {
    return this.usersService.deleteUser(id);
  }
}
