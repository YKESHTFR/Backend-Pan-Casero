import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { CreateInventoryDto, FiltersInventoryDto, UpdateInventoryDto } from './dto';

import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  async create(@Body() data: CreateInventoryDto) {
    return this.inventoryService.create(data);
  }

  @Get()
  async list(@Query() filter: FiltersInventoryDto) {
    return this.inventoryService.list(filter);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateInventoryDto) {
    return this.inventoryService.update(id, data);
  }

  @Patch('remove/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryService.remove(id);
  }
}
