import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    private allExceptionsService: AllExceptionsService,
    private responseRequestService: ResponseRequestService,
  ) { }
  async create(data: CreateSaleDto) {
    try {
      const sale = this.saleRepository.create(data);
      await this.saleRepository.save(sale);
      return this.responseRequestService.success<void>('Venta creada exitosamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, CreateSaleDto.name, SalesService.name);
    }
  }

  async list(filter: any) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.saleRepository.createQueryBuilder('sale')
        .select([
          'sale.id',
          'sale.products',
          'sale.total',
          // 'sale.quantity',
          // 'sale.price',
          // 'sale.createdAt',
          // 'sale.updatedAt',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('sale.createdAt', 'DESC');

      const sale = await queryBuilder.getMany();

      if (sale.length === 0)
        return this.responseRequestService.info('No se encontraron registros de ventas');

      return this.responseRequestService.successList<Sale[]>(
        'Registros encontrados correctamente',
        sale.length,
        sale,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, CreateSaleDto.name, SalesService.name);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} sale`;
  // }

  // update(id: number, updateSaleDto: UpdateSaleDto) {
  //   return `This action updates a #${id} sale`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sale`;
  // }
}
