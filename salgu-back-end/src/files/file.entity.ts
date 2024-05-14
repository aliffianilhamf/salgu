import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'file' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ comment: 'File size (bytes)' })
  size: number;

  @Column({ length: 511 })
  path: string;

  @Column({ name: 'user_id', comment: 'Owner of the file' })
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
