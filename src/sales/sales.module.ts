import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesController } from './sales.controller';

import { Sale } from './entities/sale.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { SalesService } from './sales.service';

@Module({
  controllers: [SalesController],
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SalesService, AllExceptionsService, ResponseRequestService],
})
export class SalesModule { }
