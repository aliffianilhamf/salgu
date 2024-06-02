import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateInvoiceDto {
  @ApiProperty()
  @IsOptional()
  paymentProofImageBase64: string;
}
