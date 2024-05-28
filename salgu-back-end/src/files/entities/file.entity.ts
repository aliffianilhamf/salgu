import { DRIVE_CONSTANTS } from 'src/config/constants';
import { DirEntity } from 'src/dirs/entities/dir.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'file' })
@Unique(['name', 'dirId', 'ownerId'])
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: DRIVE_CONSTANTS.nameLength })
  name: string;

  @Column({ comment: 'File size (bytes)' })
  size: number;

  @Column({ name: 'dir_id', comment: 'Directory where the file is located' })
  dirId: number;

  @ManyToOne(() => DirEntity)
  dir: DirEntity;

  @Column({ name: 'owner_id', comment: 'Owner of the file' })
  ownerId: number;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @UpdateDateColumn()
  updatedAt: Date;
}
