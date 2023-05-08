import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
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

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
