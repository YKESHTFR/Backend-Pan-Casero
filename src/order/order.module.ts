import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';

import { OrderController } from './order.controller';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { OrderService } from './order.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule],
  providers: [OrderService, AllExceptionsService, ResponseRequestService],
})
export class OrderModule { }
