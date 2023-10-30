import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { NoRecipeSelectedComponent } from "./recipes/no-recipe-selected/no-recipe-selected.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { EditRecipeComponent } from "./recipes/edit-recipe/edit-recipe.component";
import { RecipeResolver } from "./recipes/recipe-resolver-service";

const appRoute :Routes = [
    {path:'', redirectTo:'/recipes', pathMatch: 'full'},
    {path:'recipes', component:RecipesComponent, children:[
        {path:'',component:NoRecipeSelectedComponent},
        {path:'new', component:EditRecipeComponent},
        {path:':id',component:RecipeDetailComponent, resolve: {data: RecipeResolver}},
        {path:':id/edit', component:EditRecipeComponent, resolve: {data: RecipeResolver}},
    ]},
    {path:'shopping-list', component:ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}