import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';

import { ProductController } from './product.controller';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { ProductService } from './product.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  providers: [ProductService, AllExceptionsService, ResponseRequestService],
})
export class ProductModule { }
