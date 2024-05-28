import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNumber, IsString } from 'class-validator';
import {
  PERMISSION_LEVELS,
  PermissionLevel,
} from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  userIds: number[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  domains: string[];

  @IsIn(PERMISSION_LEVELS)
  @ApiProperty()
  level: PermissionLevel;
}
