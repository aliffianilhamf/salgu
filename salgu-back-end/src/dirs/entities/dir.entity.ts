import { DRIVE_CONSTANTS } from 'src/config/constants';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export const PERMISSION_LEVELS = ['none', 'read', 'read-write'] as const;
export type PermissionLevel = (typeof PERMISSION_LEVELS)[number];

@Entity({ name: 'dir' })
export class DirEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: DRIVE_CONSTANTS.nameLength })
  name: string;

  @Column({ length: DRIVE_CONSTANTS.pathLength })
  path: string;

  @Column({ name: 'parent_id', comment: 'Parent directory ID', nullable: true })
  parentId?: number;

  @ManyToOne(() => DirEntity, { nullable: true })
  parent?: DirEntity;
}
