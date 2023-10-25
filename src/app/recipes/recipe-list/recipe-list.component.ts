import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  
})
export class RecipeListComponent implements OnInit {

  private recipeService : RecipeService
  private router: Router
  private route: ActivatedRoute
  recipes: Recipe[];

  constructor() {
    this.recipeService = inject(RecipeService)
    this.route = inject(ActivatedRoute)
    this.router = inject(Router)
  }
  ngOnInit() {
    this.recipeService.recipeAdded.subscribe(
      (recipes: Recipe[])=>
      {
        this.recipes=recipes 
      }
    )
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.route})
  }

}
