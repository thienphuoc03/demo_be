import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ClientKafka } from '@nestjs/microservices';
import { from, of } from 'rxjs';
import { createUserDto, signInDto, signUpDto, updateUserDto } from './dto';

describe('UsersService', () => {
  let service: UsersService;
  let clientKafkaMock: jest.Mocked<ClientKafka>;

  beforeEach(async () => {
    clientKafkaMock = {
      send: jest.fn(),
      emit: jest.fn(),
    } as unknown as jest.Mocked<ClientKafka>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USERS_SERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call ClientKafka.send for signUp', () => {
    const payload: signUpDto = {
      email: 'test@gmail.com',
      password: 'password',
    };
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.signUp(payload);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('sign-up', payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for signIn', () => {
    const payload: signInDto = {
      email: 'test@gmail.com',
      password: 'password',
    };
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.signIn(payload);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('sign-in', payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for getProfile', () => {
    const userId = 1;
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.getProfile(userId);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('get-user-by-id', userId);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for getAllUser', () => {
    const limit = 10;
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.getAllUser(limit);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('get-all-users', limit);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for getUserById', () => {
    const id = 1;
    const expectedResponse = of({
      id: 1,
      name: 'user 1',
      email: '',
      role_id: 1,
      created_at: '',
      updated_at: '',
    });
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.getUserById(id);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('get-user-by-id', id);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for createUser', () => {
    const payload: createUserDto = {
      name: 'user 1',
      email: 'user1@gmail.com',
      password: 'password',
      role_id: 2,
    };
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.createUser(payload);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('create-user', payload);
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for updateUser', () => {
    const payload: updateUserDto = {
      name: 'user 1',
      email: 'user1@gmail.com',
      password: 'password',
      role_id: 2,
    };
    const id = 1;
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.updateUser(payload, id);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('update-user', {
      updateUser: payload,
      id,
    });
    expect(result).toEqual(expectedResponse);
  });

  it('should call ClientKafka.send for deleteUser', () => {
    const id = 1;
    const expectedResponse = of(/* response data */);
    clientKafkaMock.send.mockReturnValue(expectedResponse);

    const result = service.deleteUser(id);

    expect(clientKafkaMock.send).toHaveBeenCalledWith('delete-user', id);
    expect(result).toEqual(expectedResponse);
  });
});
