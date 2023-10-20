import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { createInjectableType } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private shoppingService : ShoppingService
  private shoppingSubscriber : Subscription

  ingredients: Ingredient[] 

  constructor() {
    this.shoppingService = inject(ShoppingService);
  }

  ngOnInit() {
    this.ingredients= this.shoppingService.getIngredients();
    this.shoppingSubscriber = this.shoppingService.newShoppingItemEmitted.subscribe(
      (newIngredients : Ingredient[]) =>
      {
        this.ingredients = newIngredients;
      }
    )
  }

  ngOnDestroy(): void {
    this.shoppingSubscriber.unsubscribe()
  }

}
