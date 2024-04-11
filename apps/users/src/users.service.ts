import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, from, map, of, switchMap, throwError } from 'rxjs';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signInRequest, signUpRequest } from './dto';
import { ROLE_DEFAULT } from '../../libs/constants';
import { PostgresService } from '../../libs/database/postgres.service';
import { createUserDto } from '../../api-gateway/src/users/dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly jwtService: JwtService,
  ) {}

  signUp(signUp: signUpRequest): Observable<any> {
    return from(
      this.postgresService.query('SELECT id FROM users WHERE email = $1', [
        signUp.email,
      ]),
    ).pipe(
      switchMap((result) => {
        if (result.length > 0) {
          throw new ConflictException('Email already exists');
        } else {
          return from(
            this.postgresService.query('SELECT id FROM roles WHERE name = $1', [
              ROLE_DEFAULT,
            ]),
          ).pipe(
            switchMap((roleResult) => {
              if (roleResult.length > 0) {
                const roleId = roleResult[0].id;
                return from(bcryptjs.hash(signUp.password, 10)).pipe(
                  switchMap((hashedPassword) =>
                    from(
                      this.postgresService.query(
                        'INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *',
                        [signUp.email, hashedPassword, roleId],
                      ),
                    ),
                  ),
                  map((insertResult) => insertResult[0]),
                );
              } else {
                throw new Error('Default role not found');
              }
            }),
          );
        }
      }),
    );
  }

  signIn(signIn: signInRequest): Observable<any> {
    const { email, password } = signIn;

    return from(
      this.postgresService.query(
        'SELECT users.*, roles.name AS role_name FROM users JOIN roles ON users.role_id = roles.id AND users.email = $1',
        [email],
      ),
    ).pipe(
      switchMap((user) => {
        if (!user[0]) {
          throw new UnauthorizedException('Email or Password incorrect');
        }

        return from(bcryptjs.compare(password, user[0].password)).pipe(
          switchMap((comparePassword) => {
            if (!comparePassword) {
              throw new UnauthorizedException('Email or Password incorrect');
            }

            const payload = {
              sub: user[0].id,
              email: user[0].email,
              role: user[0].role_name,
            };

            return from(
              this.jwtService.signAsync(payload, {
                expiresIn: '1h',
                secret: process.env.SECRET,
              }),
            ).pipe(
              map((access_token) => {
                return { access_token };
              }),
            );
          }),
        );
      }),
    );
  }

  getAllUser(limit: number): Observable<any> {
    return from(
      this.postgresService.query('SELECT * FROM users LIMIT $1', [limit]),
    ).pipe(
      map((users: any) => {
        return users.map((user: any) => {
          return { ...user, password: undefined };
        });
      }),
    );
  }

  getUserById(id: number): Observable<any> {
    return from(
      this.postgresService.query('SELECT * from users WHERE id = $1', [id]),
    ).pipe(
      map((user: any) => {
        if (user.length === 0 || !user) {
          return new NotFoundException('User not found');
        }

        delete user[0].password;

        return user[0];
      }),
    );
  }

  createUser(createUser: createUserDto): Observable<any> {
    return from(
      this.postgresService.query('SELECT id FROM users WHERE email = $1', [
        createUser.email,
      ]),
    ).pipe(
      switchMap((result) => {
        if (result.length > 0) {
          throw new ConflictException('Email already exists');
        } else {
          return from(
            this.postgresService.query('SELECT id FROM roles WHERE name = $1', [
              ROLE_DEFAULT,
            ]),
          ).pipe(
            switchMap((roleResult) => {
              if (roleResult.length > 0) {
                const roleId = createUser.role_id
                  ? createUser.role_id
                  : roleResult[0].id;
                return from(bcryptjs.hash(createUser.password, 10)).pipe(
                  switchMap((hashedPassword) =>
                    from(
                      this.postgresService.query(
                        'INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *',
                        [
                          createUser.name,
                          createUser.email,
                          hashedPassword,
                          roleId,
                        ],
                      ),
                    ),
                  ),
                  map((insertResult) => {
                    delete insertResult[0].password;
                    return insertResult[0];
                  }),
                );
              } else {
                throw new Error('Default role not found');
              }
            }),
          );
        }
      }),
    );
  }

  updateUser(updateUser: any, id: number): Observable<any> {
    return from(bcryptjs.hashSync(updateUser.password, 10)).pipe(
      switchMap((passwordHashed) => {
        const timestamp = new Date();

        return from(
          this.postgresService.query(
            'UPDATE users SET name = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING *',
            [updateUser.name, updateUser.email, passwordHashed, timestamp, id],
          ),
        ).pipe(
          map((user: any) => {
            if (!user) {
              throw new NotFoundException('User not found!');
            }

            delete user[0].password;
            return user[0];
          }),
        );
      }),
    );
  }

  deleteUser(id: number): Observable<any> {
    return from(
      this.postgresService.query('SELECT * FROM users WHERE id = $1', [id]),
    ).pipe(
      map((user) => {
        if (user.length === 0) {
          throw new NotFoundException('User not found');
        }

        return from(
          this.postgresService.query('DELETE FROM users WHERE id = $1', [+id]),
        ).pipe(map((user) => of('Deleted!!!')));
      }),
    );
  }
}
