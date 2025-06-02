import { IsArray, IsNotEmpty } from "class-validator";
import { CreateProductDto } from "src/product/dto";

export class CreateSaleDto {
    @IsArray()
    @IsNotEmpty()
    products: any[]; //CreateProductDto?
}
