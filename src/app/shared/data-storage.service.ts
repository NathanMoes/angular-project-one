import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { RecipeService } from '../recipe-book/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipes() {
    const currRecipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipebook-d0f9c-default-rtdb.firebaseio.com/recipes.json',
        currRecipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipebook-d0f9c-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
