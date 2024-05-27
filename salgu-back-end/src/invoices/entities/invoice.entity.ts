import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'invoice' })
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  startedAt: Date;

  @Column({ type: 'datetime' })
  endedAt: Date;

  @Column()
  amount: number;

  @Column()
  paid: boolean;

  @Column({
    comment:
      'Is the invoice amount final or not.\n' +
      'An invoice can only be paid if this is true.',
    default: false,
  })
  isFinal: boolean;

  @UpdateDateColumn()
  lastUpdatedAt: Date;

  @Column({ name: 'user_id', comment: 'user of the invoice' })
  userId: number;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
