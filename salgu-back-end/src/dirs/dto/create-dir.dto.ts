import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { DRIVE_CONSTANTS } from 'src/config/constants';

export class CreateDirDto {
  @IsString()
  @MaxLength(DRIVE_CONSTANTS.pathLength)
  @ApiProperty()
  path: string;
}
