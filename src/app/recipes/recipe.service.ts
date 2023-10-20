
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";

export class RecipeService
{


    private shoppingService : ShoppingService;
    constructor() {

    }

    private recipes: Recipe[] = [
        new Recipe('Test Recipe 1',
        'This is just a test Recipe',
        'https://www.seriouseats.com/thmb/uH_msyHurzKTDRzc4c_goGoLANI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg',
        [new Ingredient('salt', 2), new Ingredient('flour',200)]),
        
        new Recipe('Test Recipe 2',
        'This is just a test Recipe',
        'https://www.seriouseats.com/thmb/uH_msyHurzKTDRzc4c_goGoLANI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg',
        [new Ingredient('sugar',2), new Ingredient('Milk', 100)])
      ];


    getRecipe(id: number)
    {
        return this.recipes.slice()[id];
    }
    getRecipes()
    {
        return this.recipes.slice();
    } 

    addIngredients(ingredients: Ingredient[])
    {
        this.shoppingService.addIngredients(ingredients);
    }
        
      
}