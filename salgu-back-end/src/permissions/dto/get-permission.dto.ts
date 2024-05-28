import { DirEntity } from 'src/dirs/entities/dir.entity';
import { PermissionEntity } from '../entities/permission.entity';

export class GetPermissionDto extends PermissionEntity {
  isInherited: boolean;
  sourceDir?: Partial<DirEntity>;
}
