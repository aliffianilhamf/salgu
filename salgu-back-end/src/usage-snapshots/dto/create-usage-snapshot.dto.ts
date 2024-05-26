import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber } from 'class-validator';
import { ACTION, Action } from '../entities/usage-snapshot.entity';

export class CreateUsageSnapshotDto {
  @IsNumber()
  @ApiProperty()
  sizeDelta: number;

  @IsIn(ACTION)
  @ApiProperty()
  action: Action;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  fileId: number;
}
