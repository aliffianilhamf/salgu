import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GENDERS, Gender } from '../types';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: GENDERS,
  })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ select: false })
  passwordHash: string;

  @Column({ select: false })
  salt: string;

  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
