import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import {
  PERMISSION_LEVELS,
  PermissionLevel,
} from '../entities/permission.entity';

export class CreatePermissionDto {
  // TODO fix this
  @IsNumber({}, { each: true })
  @ApiProperty()
  userIds: number[];

  @IsString()
  @ApiProperty()
  domains: string[];

  @IsIn(PERMISSION_LEVELS)
  @ApiProperty()
  level: PermissionLevel;

  @IsNumber()
  @ApiProperty()
  fileId: number;

  @IsNumber()
  @ApiProperty()
  dirId: number;
}
