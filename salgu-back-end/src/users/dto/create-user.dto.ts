import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GENDERS, Gender } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsEnum(GENDERS)
  @ApiProperty()
  gender: Gender;

  @IsString()
  @MaxLength(256)
  @MinLength(8)
  @ApiProperty()
  password: string;
}
