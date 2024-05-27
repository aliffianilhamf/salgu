import { IsIn, IsNumber } from "class-validator";
import { TYPE_FILE_ACTIONS, TypeFileActions } from "../entities/file-action.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFileActionDto {
    @IsIn(TYPE_FILE_ACTIONS)
    @ApiProperty()
    type: TypeFileActions;

    @IsNumber()
    @ApiProperty()
    fileId: number;

    @IsNumber()
    @ApiProperty()
    actorId: number;
}