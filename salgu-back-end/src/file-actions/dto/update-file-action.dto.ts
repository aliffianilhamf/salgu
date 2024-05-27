import { PartialType } from '@nestjs/swagger';
import { CreateFileActionDto } from './create-file-action.dto';

export class UpdateFileActionDto extends PartialType(CreateFileActionDto) {}
