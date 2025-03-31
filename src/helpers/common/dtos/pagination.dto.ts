import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Number of items to return per page', default: 1, required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: 'Number of items to skip before starting to return items', default: 0, required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
