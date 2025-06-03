import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('jsonb', { nullable: true, default: [] })
    products: any[]; //provide an interface 

    @Column('numeric')
    total: number;

    @CreateDateColumn()
    createdAt: Date;
}
