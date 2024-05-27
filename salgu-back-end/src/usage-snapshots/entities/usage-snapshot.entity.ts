import { FileEntity } from 'src/files/entities/file.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export const ACTIONS = ['upload', 'modify', 'delete'] as const;
export type Action = (typeof ACTIONS)[number];

@Entity({ name: 'usage_snapshot' })
export class UsageSnapshotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sizeDelta: number;

  @CreateDateColumn()
  capturedAt: Date;

  @Column({ type: 'enum', enum: ACTIONS })
  action: Action;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  fileId: number;

  @ManyToOne(() => FileEntity)
  file: FileEntity;
}
