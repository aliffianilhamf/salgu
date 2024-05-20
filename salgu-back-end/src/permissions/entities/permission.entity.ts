import { DirEntity } from 'src/dirs/entities/dir.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const PERMISSION_LEVELS = ['none', 'read', 'read-write'] as const;
export type PermissionLevel = (typeof PERMISSION_LEVELS)[number];

@Entity({ name: 'permission' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { comment: 'User IDs that this permission applies to.' })
  userIds: number[];

  @Column('json', { comment: 'Email domains that this permission applies to.' })
  domains: string[];

  @Column({ type: 'enum', enum: PERMISSION_LEVELS })
  level: PermissionLevel;

  @Column({ name: 'file_id', comment: 'File that this permission applies to' })
  fileId: number;

  @ManyToOne(() => FileEntity)
  file: FileEntity;

  @Column({ name: 'dir_id', comment: 'Dir that this permission applies to' })
  dirId: number;

  @ManyToOne(() => DirEntity)
  dir: DirEntity;

  @CreateDateColumn()
  createdAt: Date;
}
