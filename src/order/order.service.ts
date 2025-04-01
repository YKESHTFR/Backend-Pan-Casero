import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderDto, FiltersOrderDto, UpdateOrderDto } from './dto';

import { Order } from './entities/order.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private responseRequestService: ResponseRequestService,
    private allExceptionsService: AllExceptionsService,
  ) { }
  async create(data: CreateOrderDto) {
    try {
      const order = this.orderRepository.create(data);
      await this.orderRepository.save(order);

      return await this.responseRequestService.success<void>('Pedido creado correctamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, Order.name, OrderService.name);
    }
  }

  async list(filter: FiltersOrderDto) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.orderRepository.createQueryBuilder('order')

      queryBuilder
        .select([
          'order.id',
          'order.customer_name',
          'order.total_amount',
          'order.created_at',
          'order.updated_at',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('order.created_at', 'DESC');

      const order = await queryBuilder.getMany();

      if (order.length === 0)
        return this.responseRequestService.info('No se encontraron registros de pedido');

      return this.responseRequestService.successList<Order[]>(
        'Registros encontrados correctamente',
        order.length,
        order,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Order.name,
        OrderService.name,
      );
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = this.orderRepository.createQueryBuilder('order')

      queryBuilder
        .select([
          'order.id',
          'order.customer_name',
          'order.total_amount',
          'order.created_at',
          'order.updated_at',
        ])
        .where('order.id = :id', { id });

      const order = await queryBuilder.getOne();

      if (!order) return this.responseRequestService.info('No se encontraron registros de pedido');

      return this.responseRequestService.success<Order>(
        'Información de pedido encontrada exitosamente',
        200,
        order,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Order.name,
        OrderService.name,
      );
    }
  }

  async update(id: string, data: UpdateOrderDto) {
    try {
      if (!data) return this.responseRequestService.error('No se recibieron datos para actualizar pedido');

      const order = await this.orderRepository.preload({
        id,
        ...data,
      });

      if (!order) return this.responseRequestService.info('No se encontró la orden para actualizar');
      await this.orderRepository.save(order);
      return this.responseRequestService.success<void>('Pedido actualizado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Order.name,
        OrderService.name,
      );
    }
  }

  async remove(id: string) {
    try {
      const order = await this.orderRepository.findOneBy({ id });

      if (!order) return this.responseRequestService.error('No se encontró el pedido para eliminar');

      await this.orderRepository.remove(order);
      return this.responseRequestService.success<void>('Pedido eliminado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Order.name,
        OrderService.name,
      );
    }
  }
}
