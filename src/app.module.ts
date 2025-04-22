import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RecipeModule } from './recipe/recipe.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { PayrollModule } from './payroll/payroll.module';
import { ProductModule } from './product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, KeycloakConnectModule, PolicyEnforcementMode, ResourceGuard, RoleGuard, TokenValidation } from 'nest-keycloak-connect';

@Module({
  imports: [ConfigModule.forRoot(),
  KeycloakConnectModule.register({
    authServerUrl: 'http://localhost:8080',
    realm: 'nestjs-realm',
    clientId: 'nestjs-api',
    secret: '2xXhenziDdyOzE6dWnzxUtIzezY4c6Sw', 
    policyEnforcement: PolicyEnforcementMode.PERMISSIVE, 
    tokenValidation: TokenValidation.ONLINE, 
  }),
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
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // obliga a usar Keycloak como guardia
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard, // habilita protección con @Resource()
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, // habilita uso de @Roles()
    },
  ],
  exports: [],
})
export class AppModule { }
