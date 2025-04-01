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
}
