import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const salt = genSaltSync();
    const passwordHash = hashSync(password, salt);
    await this.userRepo.save({ ...rest, passwordHash, salt });

    // We do it like this so we don't return the password hash and salt
    return this.findByEmail(createUserDto.email);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  findByEmail(email: string, withPasswordAndSalt = false) {
    email = email.toLowerCase();

    if (!withPasswordAndSalt) {
      return this.userRepo.findOne({ where: { email } });
    }

    return this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .addSelect('user.salt')
      .where('user.email = :email', { email })
      .getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }

  /**
   * @returns Storage usage of a user in bytes.
   */
  async getUsage(id: number) {
    const usage = await this.fileRepo.sum('size', { ownerId: id });
    return usage;
  }
}
