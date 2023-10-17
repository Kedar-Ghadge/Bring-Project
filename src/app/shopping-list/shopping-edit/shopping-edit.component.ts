import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
@ViewChild('nameIng') nameIngredient : ElementRef;
@ViewChild('amountIng') amountIngredient : ElementRef;

private shoppingService : ShoppingService;

constructor() {
    this.shoppingService = inject(ShoppingService);
}

onAddIngredient(){
  const ingredientName = this.nameIngredient.nativeElement.value;
  const ingredientAmount = this.amountIngredient.nativeElement.value;
  const newIngredient = new Ingredient(ingredientName, ingredientAmount);
  this.shoppingService.addIngredient(newIngredient);
}
}
