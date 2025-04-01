import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @ApiProperty({ description: "Unique identifier for the product", example: "123e4567-e89b-12d3-a456-426614174000" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ description: "Name of the product", example: "Bread" })
    @Column({ type: "varchar", length: 255, unique: true })
    name: string;

    @ApiProperty({ description: "Price of the product", example: 2.500 })
    @Column({ type: "numeric" })
    price: number;
    
    @ApiProperty({ description: "Indicates if the product is active", default: "true" })
    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

