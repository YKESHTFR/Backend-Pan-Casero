import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payroll } from './entities/payroll.entity';

import { PayrollController } from './payroll.controller';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { PayrollService } from './payroll.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PayrollController],
  imports: [TypeOrmModule.forFeature([Payroll]), AuthModule],
  providers: [PayrollService, AllExceptionsService, ResponseRequestService],
})
export class PayrollModule {}
