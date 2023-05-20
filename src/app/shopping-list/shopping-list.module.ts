import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [FormsModule, ShoppingListRoutingModule, CommonModule],
})
export class ShoppingListModule {}
