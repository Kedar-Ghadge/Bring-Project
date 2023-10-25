import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingService{

    newShoppingItemEmitted = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('oats', 30)
      ]

      getIngredients()
      {
        return this.ingredients.slice();
      }

      getIngredient(index: number)
      {
        return this.ingredients[index]
      }

      addIngredient(ingredient: Ingredient)
      {
        this.ingredients.push(ingredient);
        this.newShoppingItemEmitted.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[])
      {
        this.ingredients.push(...ingredients)
        this.newShoppingItemEmitted.next(this.ingredients.slice())
      }

      onUpdate(index: number, ingredient : Ingredient)
      {
        this.ingredients[index] = ingredient
        this.newShoppingItemEmitted.next(this.ingredients.slice())
      }

      deleteIngredient(index: number)
      {
        this.ingredients.splice(index,1)
        this.newShoppingItemEmitted.next(this.ingredients.slice())
      }
}