import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { CreateEmployeeDto, FiltersEmployeeDto, UpdateEmployeeDto } from './dto';

import { EmployeeService } from './employee.service';
import { ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiResponse({description: 'Employee create successfully', status: 201, type: Employee})
  @ApiResponse({description: 'Employee already exists', status: 400})
  @ApiResponse({description: 'Bad request', status: 400})
  @Post()
  async create(@Body() data: CreateEmployeeDto) {
    return this.employeeService.create(data);
  }

  @ApiResponse({description: 'List of employees', status: 200, type: Employee, isArray: true})
  @ApiResponse({description: 'Employees not found', status: 404})
  @ApiResponse({description: 'Bad request', status: 400})
  @Get()
  async list(@Query() filter: FiltersEmployeeDto) {
    return this.employeeService.list(filter);
  }

  @ApiResponse({description: 'Employee found', status: 200, type: Employee})
  @ApiResponse({description: 'Employee not found', status: 404})
  @ApiResponse({description: 'Bad request', status: 400})
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.findOne(id);
  }

  @ApiResponse({description: 'Employee updated successfully', status: 200, type: Employee})
  @ApiResponse({description: 'Employee not found', status: 404})
  @ApiResponse({description: 'Bad request', status: 400})
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateEmployeeDto) {
    return this.employeeService.update(id, data);
  }

  @ApiResponse({description: 'Employee removed successfully', status: 200})
  @ApiResponse({description: 'Employee not found', status: 404})
  @ApiResponse({description: 'Bad request', status: 400})
  @Patch('remove/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.remove(id);
  }
}
