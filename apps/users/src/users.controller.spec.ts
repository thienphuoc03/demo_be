import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            getAllUser: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should call to getAllUsers method of UsersService', async () => {
      const result: any[] = [
        {
          id: 1,
          name: 'user 1',
          email: 'user1@mail.com',
          role_id: 1,
          created_at: '',
          updated_at: '',
        },
        {
          id: 1,
          name: 'user 2',
          email: 'user2@mail.com',
          role_id: 1,
          created_at: '',
          updated_at: '',
        },
      ];
      const limit = 10;

      jest.spyOn(usersService, 'getAllUser').mockResolvedValue(result as never);
      expect(await usersController.getAllUser(limit)).toBe(result);
    });
  });

  describe('getUserById', () => {
    it('should call to getUserById method of UsersService', async () => {
      const result: any = {
        id: 1,
        name: 'user 1',
        email: '',
        role_id: 1,
        created_at: '',
        updated_at: '',
      };
      const id = 1;

      jest
        .spyOn(usersService, 'getUserById')
        .mockResolvedValue(result as never);
      expect(await usersController.getUserById(id)).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should call to createUser method of UsersService', async () => {
      const createUserDto = {
        name: 'user 1',
        email: '',
        password: '',
        role_id: 1,
      };
      const result: any = {
        id: 1,
        name: 'user 1',
        email: '',
        role_id: 1,
        created_at: '',
        updated_at: '',
      };

      jest.spyOn(usersService, 'createUser').mockResolvedValue(result as never);

      expect(await usersController.createUser(createUserDto)).toBe(result);
    });
  });

  describe('updateUser', () => {
    it('should call to updateUser method of UsersService', async () => {
      const updateUserDto = {
        name: 'user 1',
        email: '',
        password: '',
        role_id: 1,
      };
      const id = 1;
      const result: any = {
        id: 1,
        name: 'user 1',
        email: '',
        role_id: 1,
        created_at: '',
        updated_at: '',
      };

      const payload = { updateUser: updateUserDto, id };

      jest.spyOn(usersService, 'updateUser').mockResolvedValue(result as never);

      expect(await usersController.updateUser(payload)).toBe(result);
    });
  });

  describe('deleteUser', () => {
    it('should call to deleteUser method of UsersService', async () => {
      const id = 1;
      const result: string = 'User deleted successfully';

      jest.spyOn(usersService, 'deleteUser').mockResolvedValue(result as never);

      expect(await usersController.deleteUser(id)).toBe(result);
    });
  });
});
