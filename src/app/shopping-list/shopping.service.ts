import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{

    newShoppingItemEmitted = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('oats', 30)
      ]

      getIngredients()
      {
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient)
      {
        this.ingredients.push(ingredient);
        this.newShoppingItemEmitted.emit(this.ingredients);
      }

      addIngredients(ingredients: Ingredient[])
      {
        this.ingredients.push(...ingredients)
      }
}