import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPth = '';
    let recipeDesc = '';
    if (this.editMode) {
      const currentRecipe = this.recipeService.getRecipe(this.id);
      recipeName = currentRecipe.name;
      recipeDesc = currentRecipe.description;
      recipeImgPth = currentRecipe.imagePath;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDesc),
      imagePath: new FormControl(recipeImgPth),
    });
  }
}
