import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory } from './entities/inventory.entity';

import { CreateInventoryDto, FiltersInventoryDto, UpdateInventoryDto } from './dto';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private responseRequestService: ResponseRequestService,
    private allExceptionsService: AllExceptionsService,
  ) { }
  async create(data: CreateInventoryDto) {
    try {
      const inventory = this.inventoryRepository.create(data);
      await this.inventoryRepository.save(inventory);

      return await this.responseRequestService.success<void>('Inventario creado correctamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, Inventory.name, InventoryService.name);
    }
  }

  async list(filter: FiltersInventoryDto) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.inventoryRepository.createQueryBuilder('inventory')

      queryBuilder
        .select([
          'inventory.id',
          'inventory.name',
          'inventory.quantity',
          'inventory.created_at',
          'inventory.updated_at',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('inventory.created_at', 'DESC');

      const inventory = await queryBuilder.getMany();

      if (inventory.length === 0)
        return this.responseRequestService.info('No se encontraron registros de inventario');

      return this.responseRequestService.successList<Inventory[]>(
        'Registros encontrados correctamente',
        inventory.length,
        inventory,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Inventory.name,
        InventoryService.name,
      );
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = this.inventoryRepository
        .createQueryBuilder('inventory')

      queryBuilder
        .select([
          'inventory.id',
          'inventory.name',
          'inventory.quantity',
          'inventory.created_at',
          'inventory.updated_at',
        ])
        .where('inventory.id = :id', { id });

      const inventory = await queryBuilder.getOne();

      if (!inventory) return this.responseRequestService.info('No se encontraron registros de inventario');

      return this.responseRequestService.success<Inventory>(
        'Información de inventario encontrada exitosamente',
        200,
        inventory,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Inventory.name,
        InventoryService.name,
      );
    }
  }

  async update(id: string, data: UpdateInventoryDto) {
    try {
      const inventory = await this.inventoryRepository.preload({
        id,
        ...data,
      });

      if (!inventory) return this.responseRequestService.info('No se encontró el inventario para actualizar');
      await this.inventoryRepository.save(inventory);
      return this.responseRequestService.success<void>('Inventario actualizado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Inventory.name,
        InventoryService.name,
      );
    }
  }

  async remove(id: string) {
    try {
      const inventory = await this.inventoryRepository.findOneBy({ id });
      if (!inventory) return this.responseRequestService.info('No se encontró inventario para eliminar');

      inventory.is_active = false;
      inventory.updated_at = new Date();

      await this.inventoryRepository.save(inventory);
      return this.responseRequestService.success<void>('Inventario eliminado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Inventory.name,
        InventoryService.name,
      );
    }
  }
}
