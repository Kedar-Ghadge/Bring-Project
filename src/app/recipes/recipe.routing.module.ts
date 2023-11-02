import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth/auth.guard";
import { NoRecipeSelectedComponent } from "./no-recipe-selected/no-recipe-selected.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolver } from "./recipe-resolver-service";

const routes: Routes =[
{path:'recipes', component:RecipesComponent, canActivate:[AuthGuard], children:[
    {path:'',component:NoRecipeSelectedComponent},
    {path:'new', component:EditRecipeComponent},
    {path:':id',component:RecipeDetailComponent, resolve: {data: RecipeResolver}},
    {path:':id/edit', component:EditRecipeComponent, resolve: {data: RecipeResolver}},
]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule{

}