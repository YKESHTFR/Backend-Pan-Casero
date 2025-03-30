import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryController } from './inventory.controller';

import { Inventory } from './entities/inventory.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { InventoryService } from './inventory.service';

@Module({
  controllers: [InventoryController],
  imports: [TypeOrmModule.forFeature([Inventory])],
  providers: [InventoryService, AllExceptionsService, ResponseRequestService],
})
export class InventoryModule { }
