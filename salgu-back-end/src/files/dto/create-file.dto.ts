import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';
import { DRIVE_CONSTANTS } from 'src/config/constants';

export class CreateFileDto {
  @IsString()
  @MaxLength(DRIVE_CONSTANTS.nameLength)
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  dirId: number;

  @IsDateString()
  @Optional()
  retainedUntil?: Date | null;
}
