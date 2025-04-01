import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePayrollDto {
    @ApiProperty({ description: 'Salary of the employee', example: 5000 })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    salary: number;

    @ApiProperty({ description: 'Date of payment', example: "01-02-2025" })
    @IsNotEmpty()
    @IsDateString()
    payment_date: Date;
}
