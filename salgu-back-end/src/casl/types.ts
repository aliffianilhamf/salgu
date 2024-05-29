import { InferSubjects } from '@casl/ability';
import { DirEntity } from 'src/dirs/entities/dir.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export type Action = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type Subject =
  | InferSubjects<typeof UserEntity | typeof FileEntity | typeof DirEntity>
  | 'all';
