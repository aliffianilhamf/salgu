import { DirEntity } from 'src/dirs/entities/dir.entity';
import { PermissionEntity } from '../entities/permission.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetPermissionDto extends PermissionEntity {
  @ApiProperty()
  userEmails: string[];
  @ApiProperty()
  isInherited: boolean;
  @ApiProperty()
  sourceDir?: Partial<DirEntity>;
}
