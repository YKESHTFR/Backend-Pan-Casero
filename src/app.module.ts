import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RecipeModule } from './recipe/recipe.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { PayrollModule } from './payroll/payroll.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432, // Convert to number
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
  }),
    RecipeModule,
    InventoryModule,
    PayrollModule,
    OrderModule,
    EmployeeModule,
    ProductModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
