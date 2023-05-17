import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editing = false;
  editIndex: number;
  itemEditing: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.currentEdit.subscribe(
      (index: number) => {
        this.editing = true;
        this.editIndex = index;
        this.itemEditing = this.shoppingListService.getIngredient(
          this.editIndex
        );
        this.shoppingListForm.setValue({
          name: this.itemEditing.name,
          amount: this.itemEditing.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editing) {
      this.shoppingListService.updateIng(this.editIndex, newIngredient);
      this.editing = false;
    } else this.shoppingListService.addIngredient(newIngredient);
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
