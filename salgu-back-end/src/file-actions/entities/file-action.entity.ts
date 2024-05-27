import { FileEntity } from "src/files/entities/file.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class FileAction {}

export const TYPE_FILE_ACTIONS = ['upload', 'modify', 'delete'] as const;
export type TypeFileActions = (typeof TYPE_FILE_ACTIONS)[number];


@Entity({ name: 'file-actions' })
export class FileActionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: TYPE_FILE_ACTIONS })
    type: TypeFileActions;

    @CreateDateColumn()
    executedAt: Date;

    @Column({ name: 'file_id', comment: 'File that this file action applies to' })
    fileId: number;

    @ManyToOne(() => FileEntity)
    file: FileEntity;

    @Column({ name: 'actor_id', comment: 'File that this actor applies to' })
    actorId: number;

    @ManyToOne(() => UserEntity)
    actor: UserEntity;
}