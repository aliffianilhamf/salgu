import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export const ACTION_LEVELS = ['upload', 'modify', 'delete'] as const;
export type ActionLevel = (typeof ACTION_LEVELS)[number];

export class UsageSnapshotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size_delta: number;

  @CreateDateColumn()
  captured_at: Date;

  @Column({ type: 'enum', enum: ACTION_LEVELS })
  level: ActionLevel;

  @Column()
  user_id: number;

  @Column()
  file_id: number;
}
