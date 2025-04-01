import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEmployeeDto, FiltersEmployeeDto, UpdateEmployeeDto } from './dto';

import { Employee } from './entities/employee.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private responseRequestService: ResponseRequestService,
    private allExceptionsService: AllExceptionsService,
  ) { }
  async create(data: CreateEmployeeDto) {
    try {
      const { number_identification } = data;
      const employeeExists = await this.employeeRepository.findOneBy({ number_identification });
      if (employeeExists) return this.responseRequestService.error('El empleado ya existe');

      const employee = this.employeeRepository.create(data);
      await this.employeeRepository.save(employee);

      return await this.responseRequestService.success<void>('Empleado creado correctamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, Employee.name, EmployeeService.name);
    }
  }

  async list(filter: FiltersEmployeeDto) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.employeeRepository.createQueryBuilder('employee')

      queryBuilder
        .select([
          'employee.id',
          'employee.name',
          'employee.number_identification',
          'employee.role',
          'employee.address',
          'employee.created_at',
          'employee.updated_at',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('employee.created_at', 'DESC');

      const employee = await queryBuilder.getMany();

      if (employee.length === 0)
        return this.responseRequestService.info('No se encontraron registros de empleados');

      return this.responseRequestService.successList<Employee[]>(
        'Registros encontrados correctamente',
        employee.length,
        employee,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Employee.name,
        EmployeeService.name,
      );
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = this.employeeRepository.createQueryBuilder('employee')

      queryBuilder
        .select([
          'employee.id',
          'employee.name',
          'employee.number_identification',
          'employee.role',
          'employee.address',
          'employee.created_at',
          'employee.updated_at',
        ])
        .where('employee.id = :id', { id });

      const employee = await queryBuilder.getOne();

      if (!employee) return this.responseRequestService.info('No se encontraron registros de empleado');

      return this.responseRequestService.success<Employee>(
        'Información de empleado encontrada exitosamente',
        200,
        employee,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Employee.name,
        EmployeeService.name,
      );
    }
  }

  async update(id: string, data: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeRepository.preload({
        id,
        ...data,
      });

      if (!employee) return this.responseRequestService.error('No se encontró empleado para actualizar');

      await this.employeeRepository.save(employee);
      return this.responseRequestService.success<void>('Empleado actualizado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Employee.name,
        EmployeeService.name,
      );
    }
  }

  async remove(id: string) {
    try {
      const employee = await this.employeeRepository.findOneBy({ id });
      if (!employee) return this.responseRequestService.info('No se encontró emplead para eliminar');

      employee.is_active = false;
      employee.updated_at = new Date();

      await this.employeeRepository.save(employee);
      return this.responseRequestService.success<void>('Empleado eliminado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Employee.name,
        EmployeeService.name,
      );
    }
  }
}
