import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @ApiProperty({ description: 'Unique identifier for the order', example: '123e4567-e89b-12d3-a456-426614174000' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Name of the customer who placed the order', example: 'John Doe' })
    @Column({ type: 'varchar', length: 255 })
    customer_name: string;

    @ApiProperty({ description: 'Total amount for the order', example: 2500 })
    @Column('numeric', { default: 0 })
    total_amount: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
