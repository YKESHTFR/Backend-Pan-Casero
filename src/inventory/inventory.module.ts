import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Inventory } from './entities/inventory.entity';

import { InventoryController } from './inventory.controller';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { InventoryService } from './inventory.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InventoryController],
  imports: [TypeOrmModule.forFeature([Inventory]), AuthModule],
  providers: [InventoryService, AllExceptionsService, ResponseRequestService],
})
export class InventoryModule { }
