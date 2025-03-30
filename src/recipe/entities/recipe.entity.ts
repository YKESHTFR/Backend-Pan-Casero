import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255, unique: true })
    recipe_name: string;

    @Column('varchar', { length: 2500 })
    recipe_description: string;

    @Column('varchar', { length: 2500 })
    recipe_ingredients: string;

    @Column('varchar', { length: 2500 })
    recipe_instructions: string;

    @Column('boolean', { default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
