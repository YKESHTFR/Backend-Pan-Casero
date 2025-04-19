import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeController } from './employee.controller';

import { Employee } from './entities/employee.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { EmployeeService } from './employee.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([Employee]), AuthModule],
  providers: [EmployeeService, AllExceptionsService, ResponseRequestService],
})
export class EmployeeModule { }
