import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { CreateProductDto, FiltersProductDto, UpdateProductDto } from './dto';

import { Product } from './entities/product.entity';

import { ProductService } from './product.service';

import { Roles } from 'nest-keycloak-connect';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiResponse({ status: 201, description: 'Product created successfully.', type: Product })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })

  @Post()
  @Roles({ roles: ['admin'] })
  async create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @ApiResponse({ status: 200, description: 'Product list found successfully.', type: Product, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })

  @Get()
  @Roles({ roles: ['admin'] })
  async list(@Query() filter: FiltersProductDto) {
    return this.productService.list(filter);
  }

  @ApiResponse({ status: 200, description: 'Product found successfully.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  @Get(':id')
  @Roles({ roles: ['admin'] })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Product updated successfully.', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  @Patch(':id')
  @Roles({ roles: ['admin'] })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateProductDto) {
    return this.productService.update(id, data);
  }

  @ApiResponse({ status: 200, description: 'Product removed successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  @Patch('remove/:id')
  @Roles({ roles: ['admin'] })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
