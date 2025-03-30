import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Recipe } from './entities/recipe.entity';

import { CreateRecipeDto, FiltersRecipeDto, UpdateRecipeDto } from './dto';

import { AllExceptionsService } from 'src/helpers/filters/all-exceptions.service';
import { ResponseRequestService } from 'src/helpers/services/response-request.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private responseRequestService: ResponseRequestService,
    private allExceptionsService: AllExceptionsService,
  ) { }
  async create(data: CreateRecipeDto) {
    try {
      if (!data) return this.responseRequestService.error('No se recibieron datos para crear receta');

      const recipe = this.recipeRepository.create(data);
      this.recipeRepository.save(recipe);

      return await this.responseRequestService.success<void>('Receta creada correctamente', 201);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(error, null, Recipe.name, RecipeService.name);
    }
  }

  async list(filter: FiltersRecipeDto) {
    try {
      const { limit = 5, offset = 0 } = filter;

      const queryBuilder = this.recipeRepository.createQueryBuilder('recipe')

      queryBuilder
        .select([
          'recipe.id',
          'recipe.recipe_name',
          'recipe.recipe_description',
          'recipe.recipe_ingredients',
          'recipe.recipe_instructions',
          'recipe.created_at',
          'recipe.updated_at',
        ])
        .take(limit)
        .skip(offset)
        .orderBy('recipe.created_at', 'DESC');

      const recipe = await queryBuilder.getMany();

      if (recipe.length === 0)
        return this.responseRequestService.info('No se encontraron registros de recetas');

      return this.responseRequestService.successList<Recipe[]>(
        'Registros encontrados correctamente',
        recipe.length,
        recipe,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Recipe.name,
        RecipeService.name,
      );
    }
  }

  async findOne(id: string) {
    try {
      const queryBuilder = this.recipeRepository
        .createQueryBuilder('recipe')

      queryBuilder
        .select([
          'recipe.id',
          'recipe.recipe_name',
          'recipe.recipe_description',
          'recipe.recipe_ingredients',
          'recipe.recipe_instructions',
          'recipe.created_at',
          'recipe.updated_at',
        ])
        .where('recipe.id = :id', { id });

      const recipe = await queryBuilder.getOne();

      if (!recipe) return this.responseRequestService.info('No se encontraron registros de la receta');

      return this.responseRequestService.success<Recipe>(
        'Información de receta encontrada exitosamente',
        200,
        recipe,
      );
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Recipe.name,
        RecipeService.name,
      );
    }
  }

  async update(id: string, data: UpdateRecipeDto) {
    try {
      if (!data) return this.responseRequestService.error('No se recibieron datos para actualizar receta');

      const recipe = await this.recipeRepository.preload({
        id,
        ...data,
      });

      if (!recipe) return this.responseRequestService.info('No se encontró la receta para actualizar');
      await this.recipeRepository.save(recipe);
      return this.responseRequestService.success<void>('Receta actualizada correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Recipe.name,
        RecipeService.name,
      );
    }
  }

  async remove(id: string) {
    try {
      const recipe = await this.recipeRepository.findOneBy({ id });
      if (!recipe) return this.responseRequestService.info('No se encontró la receta para eliminar');

      recipe.is_active = false;
      recipe.updated_at = new Date();

      await this.recipeRepository.save(recipe);
      return this.responseRequestService.success<void>('Receta eliminada correctamente', 200);
    } catch (error) {
      this.allExceptionsService.handleDBExceptions(
        error,
        null,
        Recipe.name,
        RecipeService.name,
      );
    }
  }
}
