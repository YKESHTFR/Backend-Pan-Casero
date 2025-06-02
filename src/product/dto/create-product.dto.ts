import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ description: "Name of the product", example: "Bread" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: "Price of the product", example: 2.500 })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ description: "quantity of the product", example: 2 })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: "Description of the product", example: "New Bread" })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: "image url", example: "https://.." })
    @IsNotEmpty()
    @IsString()
    image: string;
}
