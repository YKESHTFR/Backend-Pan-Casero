import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';

import { Order } from './entities/order.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService, AllExceptionsService, ResponseRequestService],
})
export class OrderModule { }
