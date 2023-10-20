import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingService{

    newShoppingItemEmitted = new Subject<Ingredient[]>();

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
        this.newShoppingItemEmitted.next(this.ingredients);
      }

      addIngredients(ingredients: Ingredient[])
      {
        this.ingredients.push(...ingredients)
      }
}