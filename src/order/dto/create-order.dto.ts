import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ description: 'Name of the customer who placed the order', example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    customer_name: string;

    @ApiProperty({ description: 'Total amount for the order', example: 2500 })
    @IsNotEmpty()
    @IsNumber()
    total_amount: number;
}
