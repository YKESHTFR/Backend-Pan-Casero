import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recipe {
    @ApiProperty({ description: 'Unique identifier for the recipe', example: '123e4567-e89b-12d3-a456-426614174000' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Name of the recipe', example: 'Chocolate Cake' })
    @Column('varchar', { length: 255, unique: true })
    recipe_name: string;

    @ApiProperty({ description: 'Description of the recipe', example: 'A delicious chocolate cake recipe' })
    @Column('varchar', { length: 2500 })
    recipe_description: string;

    @ApiProperty({ description: 'Ingredients required for the recipe', example: 'Flour, Sugar, Cocoa Powder' })
    @Column('varchar', { length: 2500 })
    recipe_ingredients: string;

    @ApiProperty({ description: 'Instructions to prepare the recipe', example: 'Mix ingredients and bake for 30 minutes' })
    @Column('varchar', { length: 2500 })
    recipe_instructions: string;

    @ApiProperty({ description: 'Indicates if the recipe is active', example: true })
    @Column('boolean', { default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
