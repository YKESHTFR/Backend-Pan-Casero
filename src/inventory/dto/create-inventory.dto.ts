import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInventoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
