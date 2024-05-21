import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateInvoiceDto {
    @IsDateString()
    @ApiProperty()
    startedAt: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    endedAt: string;

    @IsNumber()
    @ApiProperty()
    amount: number;

    @IsBoolean()
    @ApiProperty()
    paid: boolean;

    @IsNumber()
    @ApiProperty()
    userId: number;
}
