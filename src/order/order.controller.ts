import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { CreateOrderDto, FiltersOrderDto, UpdateOrderDto } from './dto';

import { Order } from './entities/order.entity';

import { OrderService } from './order.service';

import { Roles } from 'nest-keycloak-connect';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiResponse({ status: 201, description: 'Order created successfully.', type: Order })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })

  @Post()
  @Roles({ roles: ['admin', 'user'] })
  async create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @ApiResponse({ status: 200, description: 'List of orders.', type: Order, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })

  @Get()
  @Roles({ roles: ['admin', 'user'] })
  async list(@Query() filter: FiltersOrderDto) {
    return this.orderService.list(filter);
  }

  @ApiResponse({ status: 200, description: 'Order found.', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  @Get(':id')
  @Roles({ roles: ['admin', 'user'] })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Order updated successfully.', type: Order })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  @Patch(':id')
  @Roles({ roles: ['admin', 'user'] })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Delete(':id')
  @Roles({ roles: ['admin', 'user'] })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}
