import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';

import { CreateProductDto, FiltersProductDto, UpdateProductDto } from './dto';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private responseRequestService: ResponseRequestService,
    private allExceptionsService: AllExceptionsService,
  ) { }
  async create(data: CreateProductDto) {
    try {
      const product = this.productRepository.create(data);
      await this.productRepository.save(product);

      return await this.responseRequestService.success<void>('Producto creado correctamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, Product.name, ProductService.name);
    }
  }

  async list(filter: FiltersProductDto) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.productRepository.createQueryBuilder('product')

      queryBuilder
        .select([
          'product.id',
          'product.name',
          'product.price',
          'product.created_at',
          'product.updated_at',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('product.created_at', 'DESC');

      const recipe = await queryBuilder.getMany();

      if (recipe.length === 0)
        return this.responseRequestService.info('No se encontraron registros de productos');

      return this.responseRequestService.successList<Product[]>(
        'Registros encontrados correctamente',
        recipe.length,
        recipe,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Product.name,
        ProductService.name,
      );
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = this.productRepository.createQueryBuilder('product')

      queryBuilder
        .select([
          'product.id',
          'product.name',
          'product.price',
          'product.created_at',
          'product.updated_at',
        ])
        .where('product.id = :id', { id });

      const product = await queryBuilder.getOne();

      if (!product) return this.responseRequestService.info('No se encontraron registros de producto');

      return this.responseRequestService.success<Product>(
        'Información de producto encontrada exitosamente',
        200,
        product,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Product.name,
        ProductService.name,
      );
    }
  }

  async update(id: string, data: UpdateProductDto) {
    try {
      if (!data) return this.responseRequestService.error('No se recibieron datos para actualizar producto');

      const product = await this.productRepository.preload({
        id,
        ...data,
      });

      if (!product) return this.responseRequestService.info('No se encontró el producto para actualizar');
      await this.productRepository.save(product);
      return this.responseRequestService.success<void>('Producto actualizado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Product.name,
        ProductService.name,
      );
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) return this.responseRequestService.info('No se encontró producto para eliminar');

      product.is_active = false;
      product.updated_at = new Date();

      await this.productRepository.save(product);
      return this.responseRequestService.success<void>('Producto eliminado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Product.name,
        ProductService.name,
      );
    }
  }
}
