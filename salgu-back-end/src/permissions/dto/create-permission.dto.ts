import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  PERMISSION_LEVELS,
  PermissionLevel,
} from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ type: [Number] })
  userIds?: number[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ type: [String] })
  userEmails?: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String] })
  domains: string[];

  @IsIn(PERMISSION_LEVELS)
  @ApiProperty()
  level: PermissionLevel;
}
