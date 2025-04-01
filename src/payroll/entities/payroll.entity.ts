import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Payroll {
    @ApiProperty({description: 'Unique identifier for the payroll record', example: '123e4567-e89b-12d3-a456-426614174000'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // relation whit employee

    @ApiProperty({ description: 'Salary of the employee', example: 5000 })
    @Column('numeric', { default: 0 })
    salary: number;

    @ApiProperty({ description: 'Date of payment', example: "01-02-2025" })
    @Column('timestamp')
    payment_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
