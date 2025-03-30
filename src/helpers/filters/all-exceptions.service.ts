import { BadRequestException, Catch, InternalServerErrorException, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsService {
  private readonly logger = new Logger(AllExceptionsService.name);

  // Manejo centralizado de excepciones de la base de datos
  handleDBExceptions(error: any, message: string | null, entity: string, service: string) {
    switch (error.code) {
      case '23505': // Duplicate Key Violation
        this.logger.error(
          `Error occurred at ${entity} -> ${service}`,
          `Detail: ${error.detail} | Code: ${error.code}`,
        );
        throw new BadRequestException(message ?? 'Duplicate entry detected');

      case '23503': // Foreign Key Violation
        this.logger.error(
          `Error occurred at ${entity} -> ${service}`,
          `Detail: ${error.detail} | Code: ${error.code}`,
        );
        throw new BadRequestException('Invalid foreign key reference');

      case '23502': // Not Null Violation
        this.logger.error(
          `Error occurred at ${entity} -> ${service}`,
          `Detail: ${error.detail} | Code: ${error.code}`,
        );
        throw new BadRequestException('A required field is missing');

      case '22P02': // Invalid Text Representation
        this.logger.error(
          `Error occurred at ${entity} -> ${service}`,
          `Detail: ${error.detail} | Code: ${error.code}`,
        );
        throw new BadRequestException('Invalid input syntax');

      case '22001': // String Data Right Truncation
        this.logger.error(
          `Error occurred at ${entity} -> ${service}`,
          `Detail: ${error.detail} | Code: ${error.code}`,
        );
        throw new BadRequestException('Input value exceeds the allowed length');

      default:
        this.logger.error(`Error occurred at ${entity} -> ${service}`, `Detail: ${error}`);
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }
  }
}
