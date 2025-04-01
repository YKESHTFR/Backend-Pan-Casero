import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Employee {
    @ApiProperty({ description: 'Unique identifier for the employee', example: '123e4567-e89b-12d3-a456-426614174000' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Name of the employee', example: 'John Doe' })
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @ApiProperty({ description: 'Number identification of the employee', example: '123456789' })
    @Column({ type: 'varchar', length: 255 , unique: true})
    number_identification: string;

    @ApiProperty({ description: 'Role of the employee', example: 'Manager' })
    @Column({ type: 'varchar', length: 255 })
    role: string;

    @ApiProperty({ description: 'Address of the employee', example: 'Cra 4 - 56, Pasto, Colombia' })
    @Column({ type: 'varchar', length: 255 })
    address: string;

    @ApiProperty({description: 'indicates if the employee is active or not', example: true})
    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
