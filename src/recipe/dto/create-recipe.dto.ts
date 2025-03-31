import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRecipeDto {
    @ApiProperty({ description: 'Unique identifier for the recipe', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsNotEmpty()
    @IsString()
    recipe_name: string;

    @ApiProperty({ description: 'Description of the recipe', example: 'A delicious chocolate cake recipe' })
    @IsNotEmpty()
    @IsString()
    recipe_description: string;

    @ApiProperty({ description: 'Ingredients required for the recipe', example: 'Flour, Sugar, Cocoa Powder' })
    @IsNotEmpty() //can be array of ingredients
    @IsString()
    recipe_ingredients: string;

    @ApiProperty({ description: 'Instructions to prepare the recipe', example: 'Mix ingredients and bake for 30 minutes' })
    @IsNotEmpty()
    @IsString()
    recipe_instructions: string;
}
