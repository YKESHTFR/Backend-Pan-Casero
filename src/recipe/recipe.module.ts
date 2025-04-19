import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeController } from './recipe.controller';

import { Recipe } from './entities/recipe.entity';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';
import { RecipeService } from './recipe.service';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RecipeController],
  imports: [TypeOrmModule.forFeature([Recipe]), AuthModule],
  providers: [RecipeService, AllExceptionsService, ResponseRequestService],
})
export class RecipeModule { }
