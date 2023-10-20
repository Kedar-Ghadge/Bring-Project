import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  chooseRecipe : Recipe;

  private recipeService : RecipeService

  constructor() {
    this.recipeService = inject(RecipeService)
  }
  
  ngOnInit(): void {

  }

  
}
