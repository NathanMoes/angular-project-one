import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A test',
      'a test',
      'https://cdn.tasteatlas.com/images/recipes/95d3d96a65444de183a6c64f8aeadd25.jpg'
    ),
  ];
}
