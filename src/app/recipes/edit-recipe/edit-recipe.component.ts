import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  id: number
  isEditable=false
  recipeForm : FormGroup
  


  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id=+params['id'];
        this.isEditable = params['id'] != null;
      }
    );
    this.onFormInit()
  }

  private onFormInit()
  {
    let recipeName = ''
    let recipeUrl = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])
    if(this.isEditable)
    {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeUrl = recipe.imagePath
      recipeDescription = recipe.description

      if(recipe['ingredients'])
      {
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push (new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+[1-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeUrl, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls()
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit()
  {
    if(this.isEditable)
    {
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate(['recipes'])
  }
}
