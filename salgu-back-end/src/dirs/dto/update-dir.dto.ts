import { PartialType } from '@nestjs/swagger';
import { CreateDirDto } from './create-dir.dto';

export class UpdateDirDto extends PartialType(CreateDirDto) {}
