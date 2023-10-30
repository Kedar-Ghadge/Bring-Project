import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage-service";
import { inject } from "@angular/core";
import { RecipeService } from "./recipe.service";

export const RecipeResolver : ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
{
    const dataStorageService = inject(DataStorageService);
    const recipeService = inject(RecipeService);
    const recipes = recipeService.getRecipes()
    if(recipes.length === 0)
    return dataStorageService.fetchRecipes()
    else
    return recipes
}