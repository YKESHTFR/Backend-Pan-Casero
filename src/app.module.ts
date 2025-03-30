import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RecipeModule } from './recipe/recipe.module';

import { RecipeService } from './recipe/recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  RecipeModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
