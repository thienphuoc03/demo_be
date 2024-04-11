import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createUserDto, signInDto, signUpDto, updateUserDto } from './dto';
import { of } from 'rxjs';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    // Create mock UsersService
    usersService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
      getProfile: jest.fn(),
      getAllUser: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call signUp with provided signUp data', () => {
    const signUpData: signUpDto = {
      email: 'test@gmail.com',
      password: 'password',
    };
    const expectedResponse = of({
      access_token: 'access_token',
    });
    usersService.signUp.mockReturnValue(expectedResponse);

    const result = controller.signUp(signUpData);

    expect(usersService.signUp).toHaveBeenCalledWith(signUpData);
    expect(result).toEqual(expectedResponse);
  });

  it('should call signIn with provided signIn data', () => {
    const signInData: signInDto = {
      email: 'test@gmail.com',
      password: 'password',
    };
    const expectedResponse = of({
      id: 1,
      name: 'user 1',
      email: '',
      role_id: 1,
      created_at: '',
      updated_at: '',
    });
    usersService.signIn.mockReturnValue(expectedResponse);

    const result = controller.signIn(signInData);

    expect(usersService.signIn).toHaveBeenCalledWith(signInData);
    expect(result).toEqual(expectedResponse);
  });

  it('should call getProfile with user id', () => {
    const user = { sub: 1 };
    const expectedResponse = of(/* response data */);
    usersService.getProfile.mockReturnValue(expectedResponse);

    const result = controller.getProfile(user);

    expect(usersService.getProfile).toHaveBeenCalledWith(user.sub);
    expect(result).toEqual(expectedResponse);
  });

  it('should call getAllUsers with the provided limit', () => {
    const limit = 10;
    const expectedResponse = of(/* response data */);
    usersService.getAllUser.mockReturnValue(expectedResponse);

    const result = controller.getAllUsers(limit);

    expect(usersService.getAllUser).toHaveBeenCalledWith(limit);
    expect(result).toEqual(expectedResponse);
  });

  it('should call getUserById with provided id', () => {
    const id = 1;
    const expectedResponse = of(/* response data */);
    usersService.getUserById.mockReturnValue(expectedResponse);

    const result = controller.getUserById(id);

    expect(usersService.getUserById).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResponse);
  });

  it('should call createUser with provided createUser data', () => {
    const createUserData: createUserDto = {
      name: 'user 1',
      email: '',
      password: '',
      role_id: 1,
    };
    const expectedResponse = of({
      id: 1,
      name: 'user 1',
      email: '',
      role_id: 1,
      created_at: '',
      updated_at: '',
    });
    usersService.createUser.mockReturnValue(expectedResponse);

    const result = controller.createUser(createUserData);

    expect(usersService.createUser).toHaveBeenCalledWith(createUserData);
    expect(result).toEqual(expectedResponse);
  });

  it('should call updateUser with provided updateUser data and id', () => {
    const updateUserData: updateUserDto = {
      name: 'user 1',
      email: '',
      password: '',
      role_id: 1,
    };
    const id = 1;
    const expectedResponse = of({
      id: 1,
      name: 'user 1',
      email: '',
      role_id: 1,
      created_at: '',
      updated_at: '',
    });
    usersService.updateUser.mockReturnValue(expectedResponse);

    const result = controller.updateUser(updateUserData, id);

    expect(usersService.updateUser).toHaveBeenCalledWith(updateUserData, id);
    expect(result).toEqual(expectedResponse);
  });

  it('should call deleteUser with provided id', () => {
    const id = 1;
    const expectedResponse = of('User deleted successfully');
    usersService.deleteUser.mockReturnValue(expectedResponse);

    const result = controller.deleteUser(id);

    expect(usersService.deleteUser).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedResponse);
  });
});
