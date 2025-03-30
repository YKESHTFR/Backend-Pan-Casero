import { IsNotEmpty, IsString } from "class-validator";

export class CreateRecipeDto {
    @IsNotEmpty()
    @IsString()
    recipe_name: string;

    @IsNotEmpty()
    @IsString()
    recipe_description: string;

    @IsNotEmpty() //can be array of ingredients
    @IsString()
    recipe_ingredients: string;

    @IsNotEmpty()
    @IsString()
    recipe_instructions: string;
}
