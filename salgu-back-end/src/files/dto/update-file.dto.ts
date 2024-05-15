import { OmitType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends OmitType(CreateFileDto, ['userId']) {}
