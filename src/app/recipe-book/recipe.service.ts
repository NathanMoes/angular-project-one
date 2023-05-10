import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Apple pie',
      'Traditional america apple pie!',
      'https://hips.hearstapps.com/hmg-prod/images/apple-pie-index-6425bd0363f16.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*',
      [
        new Ingredient('apples', 5),
        new Ingredient('pie crust', 1),
        new Ingredient('whipped topping', 1),
      ]
    ),
    new Recipe(
      'Burger!',
      'Big ol american style burger!',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmDi4JKuQSFiaoVuJpmXplEZ4G2KV8t_VwBRg0yVnzJhuIFExeM0q4xPi7s9oh-riJ2I_3Ou0Iqw&usqp=CAU&ec=48665698',
      [
        new Ingredient('ground beef', 16),
        new Ingredient('buns', 2),
        new Ingredient('pickle', 1),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService;
  }
}
