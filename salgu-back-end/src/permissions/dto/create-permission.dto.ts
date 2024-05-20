import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import {
  PERMISSION_LEVELS,
  PermissionLevel,
} from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  userIds: number[];

  @IsString({ each: true })
  @ApiProperty({ type: [String] })
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
