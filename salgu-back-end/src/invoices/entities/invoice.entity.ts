import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'invoice' })
export class InvoiceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "datetime"})
    startedAt: Date;
    
    @Column({ type: "datetime", nullable: true })
    endedAt?: Date;

    @Column()
    amount: number;

    @Column()
    paid: boolean;

    @Column({ name: 'user_id', comment: 'user of the file' })
    userId: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
