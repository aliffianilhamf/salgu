import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Payment {}

@Entity({ name: 'payment' })
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    paidAt: Date;

    @Column()
    amount: number;

    @Column({ name: 'user_id'})
    userId: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity;
    
    @Column()
    destinationAccount: string;

    @Column()
    isValid: boolean

    @Column()
    validatedAt: Date;
}
