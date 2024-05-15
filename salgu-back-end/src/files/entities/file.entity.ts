import { DRIVE_CONSTANTS } from 'src/config/constants';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'file' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: DRIVE_CONSTANTS.nameLength })
  name: string;

  @Column({ comment: 'File size (bytes)' })
  size: number;

  @Column({ length: DRIVE_CONSTANTS.pathLength })
  path: string;

  @Column({ name: 'owner_id', comment: 'Owner of the file' })
  ownerId: number;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;
}
