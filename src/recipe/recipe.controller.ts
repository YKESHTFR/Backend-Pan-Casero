import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto, FiltersRecipeDto, UpdateRecipeDto } from './dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() data: CreateRecipeDto) {
    return this.recipeService.create(data);
  }

  @Get()
  async list(@Query() filter: FiltersRecipeDto) {
    return this.recipeService.list(filter);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateRecipeDto) {
    return this.recipeService.update(id, data);
  }

  @Patch('remove/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.recipeService.remove(id);
  }
}
