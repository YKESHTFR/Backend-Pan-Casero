import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { CreateRecipeDto, FiltersRecipeDto, UpdateRecipeDto } from './dto';

import { ApiResponse } from '@nestjs/swagger';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Recipe created successfully', type: Recipe })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() data: CreateRecipeDto) {
    return this.recipeService.create(data);
  }

  @ApiResponse({ status: 200, description: 'List of recipes', type: Recipe, isArray: true })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get()
  async list(@Query() filter: FiltersRecipeDto) {
    return this.recipeService.list(filter);
  }

  @ApiResponse({ status: 200, description: 'Recipe found', type: Recipe })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRecipeDto) {
    return this.recipeService.update(id, data);
  }

  @ApiResponse({ status: 200, description: 'Recipe removed successfully' })
  @ApiResponse({ status: 404, description: 'Recipe not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch('remove/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipeService.remove(id);
  }
}
