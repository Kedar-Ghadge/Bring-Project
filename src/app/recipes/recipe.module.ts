import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component";
import { NoRecipeSelectedComponent } from "./no-recipe-selected/no-recipe-selected.component";
import { RecipeRoutingModule } from "./recipe.routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    EditRecipeComponent,
    NoRecipeSelectedComponent
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, RecipeRoutingModule]
})
export class RecipeModule{}