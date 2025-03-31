import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInventoryDto {
    @ApiProperty({ description: 'Name of the inventory item', example: 'Sugar' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The quantity of item', example: 10 })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
