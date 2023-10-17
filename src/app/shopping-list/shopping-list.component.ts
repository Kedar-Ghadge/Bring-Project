import { Component, OnInit, inject } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { createInjectableType } from '@angular/compiler';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  private shoppingService : ShoppingService

  ingredients: Ingredient[] 

  constructor() {
    this.shoppingService = inject(ShoppingService);
  }

  ngOnInit() {
    this.ingredients= this.shoppingService.getIngredients();
    this.shoppingService.newShoppingItemEmitted.subscribe(
      (newIngredients : Ingredient[]) =>
      {
        this.ingredients = newIngredients;
      }
    )
  }

}
