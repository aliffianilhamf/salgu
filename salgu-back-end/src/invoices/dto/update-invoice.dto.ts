import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateInvoiceDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  paid: boolean;
}
