import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber } from 'class-validator';
import { ACTION_LEVELS, ActionLevel } from '../entities/usage-snapshot.entity';

export class CreateUsageSnapshotDto {
  @IsNumber()
  @ApiProperty()
  sizeDelta: number;

  @IsIn(ACTION_LEVELS)
  @ApiProperty()
  action: ActionLevel;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  fileId: number;
}
