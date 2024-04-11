import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { createUserDto, signInDto, signUpDto, updateUserDto } from './dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.drcorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { LIMIT_NUNBER_DEFAULT } from '../../../libs/constants';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly clientKafka: ClientKafka,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf('get-all-users');
    this.clientKafka.subscribeToResponseOf('get-user-by-id');
    this.clientKafka.subscribeToResponseOf('create-user');
    this.clientKafka.subscribeToResponseOf('update-user');
    this.clientKafka.subscribeToResponseOf('delete-user');
    this.clientKafka.subscribeToResponseOf('sign-up');
    this.clientKafka.subscribeToResponseOf('sign-in');

    this.clientKafka.connect();
  }

  @Public()
  @Post('sign-up')
  signUp(@Body() signUp: signUpDto) {
    return this.usersService.signUp(signUp);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() signIn: signInDto) {
    return this.usersService.signIn(signIn);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get('profile/me')
  getProfile(@CurrentUser() user: any) {
    const userId = user.sub;

    return this.usersService.getProfile(+userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get()
  getAllUsers(@Query('limit') limit: number = LIMIT_NUNBER_DEFAULT) {
    return this.usersService.getAllUser(limit);
  }

  @Public()
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  createUser(@Body() createUser: createUserDto) {
    return this.usersService.createUser(createUser);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('update/:id')
  updateUser(@Body() updateUser: updateUserDto, @Param('id') id: number) {
    return this.usersService.updateUser(updateUser, +id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(+id);
  }
}
