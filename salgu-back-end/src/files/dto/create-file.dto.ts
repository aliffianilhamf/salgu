import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { DRIVE_CONSTANTS } from 'src/config/constants';

export class CreateFileDto {
  @IsString()
  @MaxLength(DRIVE_CONSTANTS.nameLength)
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  dirId: number;
}
