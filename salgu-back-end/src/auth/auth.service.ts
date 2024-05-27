import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const passwordHash = hashSync(password, user.salt);
    const isPasswordValid = passwordHash === user.passwordHash;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
      payload,
    };
  }
}
