import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';
import { Roles } from 'nest-keycloak-connect';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  async list(@Query() filter: any) {
    return this.salesService.list(filter);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.salesService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
  //   return this.salesService.update(+id, updateSaleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.salesService.remove(+id);
  // }
}
