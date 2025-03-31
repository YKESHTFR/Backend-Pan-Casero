import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Inventory {
    @ApiProperty({description: 'Unique identifier for the inventory item', example: '123e4567-e89b-12d3-a456-426614174000'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({description: 'Name of the inventory item', example: 'Sugar'})
    @Column('varchar', { length: 255 })
    name: string;

    @ApiProperty({description: 'The quantity of item', example: 10})
    @Column('numeric', { default: 0 })
    quantity: number;

    @ApiProperty({description: 'Indicates if the inventory is active', example: 'true'})
    @Column('boolean', { default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
