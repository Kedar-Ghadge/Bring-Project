import { Component, Input, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
 @Input('recipe') myRecipe : Recipe

 private recipeService : RecipeService
 constructor() {
  this.recipeService = inject(RecipeService)
 }

 addToShoppingList()
 {
    this.recipeService.addIngredients(this.myRecipe.ingredients);
 }
}
