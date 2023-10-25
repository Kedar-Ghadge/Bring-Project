import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 myRecipe : Recipe
 id: number

 private recipeService : RecipeService
 private route : ActivatedRoute
 private router : Router

 constructor() {
  this.recipeService = inject(RecipeService)
  this.route = inject(ActivatedRoute)
  this.router = inject(Router)
 }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.myRecipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

 addToShoppingList()
 {
    this.recipeService.addIngredients(this.myRecipe.ingredients);
 }

 onEditRecipe()
 {
  this.router.navigate(['edit'],{relativeTo:this.route})
 }

 onDelete()
 {
  this.recipeService.deleteRecipe(this.id)
  this.router.navigate(['../'],{relativeTo:this.route})
 }
}
