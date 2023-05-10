import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A test',
      'a test',
      'https://cdn.tasteatlas.com/images/recipes/95d3d96a65444de183a6c64f8aeadd25.jpg'
    ),
    new Recipe(
      'Another one',
      'Another one text',
      'https://cdn.tasteatlas.com/images/recipes/95d3d96a65444de183a6c64f8aeadd25.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
