import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
import { CreatePayrollDto } from "src/payroll/dto";

export class CreateEmployeeDto {
    @ApiProperty({ description: 'Name of the employee', example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'Number identification of the employee', example: '123456789' })
    @IsNotEmpty()
    @IsString()
    number_identification: string;

    @ApiProperty({ description: 'Role of the employee', example: 'Manager' })
    @IsNotEmpty()
    @IsString()
    role: string;

    @ApiProperty({ description: 'Address of the employee', example: 'Cra 4 - 56, Pasto, Colombia' })
    @IsNotEmpty()
    @IsString()
    address: string;

    @IsObject()
    @ValidateNested()
    @Type(() => CreatePayrollDto)
    @IsNotEmpty()
    payroll: CreatePayrollDto;
}
