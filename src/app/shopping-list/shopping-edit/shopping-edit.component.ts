import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

private shoppingService : ShoppingService;
@ViewChild('f') slForm: NgForm
subscription: Subscription
isEditMode: boolean = false
editItemIndex: number
fetchedIngredient: Ingredient

constructor() {
    this.shoppingService = inject(ShoppingService);
}

onAddIngredient(form: NgForm){
  const value = form.value
  const newIngredient = new Ingredient(value.name, value.amount);
  if(this.isEditMode)
  {
    this.shoppingService.onUpdate(this.editItemIndex, newIngredient)
  }
  else
  {
    this.shoppingService.addIngredient(newIngredient);
  }
  this.onClear()
}

ngOnInit() {
  this.subscription = this.shoppingService.startedEditing.subscribe((index: number) =>
  {
    this.editItemIndex = index
    this.isEditMode = true
    this.fetchedIngredient = this.shoppingService.getIngredient(index)
    this.slForm.setValue({
      name: this.fetchedIngredient.name,
      amount: this.fetchedIngredient.amount
    })

  })
}

onClear()
{
  this.slForm.reset()
  this.isEditMode = false
}

onDelete()
{
  this.shoppingService.deleteIngredient(this.editItemIndex)
  this.onClear()
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
