import { IsArray, IsNotEmpty, IsNumber, isNumber } from "class-validator";
import { CreateProductDto } from "src/product/dto";

export class CreateSaleDto {
    @IsArray()
    @IsNotEmpty()
    products: any[]; //CreateProductDto?

    @IsNotEmpty()
    @IsNumber()
    total: number;
}
