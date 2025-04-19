import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { CreateInventoryDto, FiltersInventoryDto, UpdateInventoryDto } from './dto';

import { Inventory } from './entities/inventory.entity';

import { InventoryService } from './inventory.service';

import { Roles } from 'nest-keycloak-connect';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @ApiResponse({ status: 201, description: 'Inventory created successfully', type: Inventory })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })

  @Roles({ roles: ['admin'] })
  @Post()
  async create(@Body() data: CreateInventoryDto) {
    return this.inventoryService.create(data);
  }

  @ApiResponse({ status: 200, description: 'List of inventories', type: Inventory, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })

  @Get()
  @Roles({ roles: ['admin', 'user'] })
  async list(@Query() filter: FiltersInventoryDto) {
    return this.inventoryService.list(filter);
  }

  @ApiResponse({ status: 200, description: 'Inventory found', type: Inventory })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })

  @Get(':id')
  @Roles({ roles: ['admin', 'user'] })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Inventory updated successfully', type: Inventory })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })

  @Patch(':id')
  @Roles({ roles: ['admin'] })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateInventoryDto) {
    return this.inventoryService.update(id, data);
  }

  @ApiResponse({ status: 200, description: 'Inventory removed successfully' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })

  @Patch('remove/:id')
  @Roles({ roles: ['admin'] })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryService.remove(id);
  }
}
