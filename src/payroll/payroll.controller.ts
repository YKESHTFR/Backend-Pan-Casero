import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { CreatePayrollDto, FiltersPayrollDto, UpdatePayrollDto } from './dto';

import { PayrollService } from './payroll.service';
import { ApiResponse } from '@nestjs/swagger';
import { Payroll } from './entities/payroll.entity';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) { }

  @ApiResponse({ description: 'Create a new payroll record', status: 200, type: Payroll })
  @ApiResponse({ description: 'Bad Request', status: 400 })
  @ApiResponse({ description: 'Internal Server Error', status: 500 })
  @Post()
  async create(@Body() data: CreatePayrollDto) {
    return this.payrollService.create(data);
  }

  @ApiResponse({ description: 'List all payroll records', status: 200, type: Payroll, isArray: true })
  @ApiResponse({ description: 'Not Found', status: 404 })
  @ApiResponse({ description: 'Bad Request', status: 400 })
  @Get()
  async list(@Query() filter: FiltersPayrollDto) {
    return this.payrollService.list(filter);
  }

  @ApiResponse({ description: 'Get a payroll record by ID', status: 200, type: Payroll })
  @ApiResponse({ description: 'Not Found', status: 404 })
  @ApiResponse({ description: 'Bad Request', status: 400 })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.payrollService.findOne(id);
  }

  @ApiResponse({ description: 'Update a payroll record', status: 200, type: Payroll })
  @ApiResponse({ description: 'Not Found', status: 404 })
  @ApiResponse({ description: 'Bad Request', status: 400 })
  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdatePayrollDto) {
    return this.payrollService.update(id, data);
  }

  // @Delete(':id') we can´t delete a payroll
  // remove(@Param('id') id: string) {
  //   return this.payrollService.remove(+id);
  // }
}
