import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { Repository } from 'typeorm';
import { CreatePayrollDto, FiltersPayrollDto, UpdatePayrollDto } from './dto';
import { Payroll } from './entities/payroll.entity';
@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
    private responseRequestService: ResponseRequestService,
    private allExceptionsService: AllExceptionsService,
  ) { }
  //Here apply the relations
  async create(data: CreatePayrollDto) {
    try {
      // TODO: search the employee in the database
      const payroll = this.payrollRepository.create(data);
      await this.payrollRepository.save(payroll);

      return await this.responseRequestService.success<void>('Nomina creada correctamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, Payroll.name, PayrollService.name);
    }
  }

  async list(filter: FiltersPayrollDto) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.payrollRepository.createQueryBuilder('payroll')

      queryBuilder
        .select([
          'payroll.id',
          'payroll.salary',
          'payroll.payment_date',
          'payroll.created_at',
          'payroll.updated_at',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('payroll.created_at', 'DESC');

      const payroll = await queryBuilder.getMany();

      if (payroll.length === 0)
        return this.responseRequestService.info('No se encontraron registros de nominas');

      return this.responseRequestService.successList<Payroll[]>(
        'Registros encontrados correctamente',
        payroll.length,
        payroll,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Payroll.name,
        PayrollService.name,
      );
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = this.payrollRepository.createQueryBuilder('payroll')

      queryBuilder
        .select([
          'payroll.id',
          'payroll.salary',
          'payroll.payment_date',
          'payroll.created_at',
          'payroll.updated_at',
        ])
        .where('payroll.id = :id', { id });

      const payroll = await queryBuilder.getOne();

      if (!payroll) return this.responseRequestService.info('No se encontraron registros de nomina');

      return this.responseRequestService.success<Payroll>(
        'Información de nomina encontrada exitosamente',
        200,
        payroll,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Payroll.name,
        PayrollService.name,
      );
    }
  }

  async update(id: string, data: UpdatePayrollDto) {
    try {
      if (!data) return this.responseRequestService.error('No se recibieron datos para actualizar nomina');

      const payroll = await this.payrollRepository.preload({
        id,
        ...data,
      });

      if (!payroll) return this.responseRequestService.info('No se encontró nomina para actualizar');
      await this.payrollRepository.save(payroll);
      return this.responseRequestService.success<void>('Nomina actualizado correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Payroll.name,
        PayrollService.name,
      );
    }
  }

  // remove(id: string) {
  //   return `This action removes a #${id} payroll`;
  // }
}
