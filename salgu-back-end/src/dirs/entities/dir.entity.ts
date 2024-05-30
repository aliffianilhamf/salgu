import { DRIVE_CONSTANTS } from 'src/config/constants';
import { FileEntity } from 'src/files/entities/file.entity';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export const PERMISSION_LEVELS = ['none', 'read', 'read-write'] as const;
export type PermissionLevel = (typeof PERMISSION_LEVELS)[number];

@Entity({ name: 'dir' })
@Unique(['path', 'ownerId'])
export class DirEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: DRIVE_CONSTANTS.nameLength })
  name: string;

  @Column({ length: DRIVE_CONSTANTS.pathLength })
  path: string;

  @Column({ name: 'owner_id', comment: 'Owner of the file' })
  ownerId: number;

  @Column({ name: 'parent_id', comment: 'Parent directory ID', nullable: true })
  parentId?: number;

  @ManyToOne(() => DirEntity, { nullable: true })
  parent?: DirEntity;

  @OneToMany(() => DirEntity, (dir) => dir.parent)
  dirChildren?: DirEntity[];

  @OneToMany(() => FileEntity, (file) => file.dir)
  fileChildren?: FileEntity[];

  @OneToMany(() => PermissionEntity, (permission) => permission.dir)
  permissions: PermissionEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
