import { EventEmitter,Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../common/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';


@Injectable()
export class RecipeService {

private recipes: Recipe[] = [
    new Recipe('Chicken Biriyani','This is a Recipe for Chicken Biriyani',
    'https://user-images.immediate.co.uk/bbcgoodfood/recipes/user-recipe/url_4.jpg?quality=90&resize=556,505'
    ,[
    new Ingredient('chicken',2),
    new Ingredient('rice',1)
    ]),
     new Recipe('Mutton Biriyani','This is a Recipe for Mutton Biriyani',
        'https://user-images.immediate.co.uk/bbcgoodfood/recipes/user-recipe/url_4.jpg?quality=90&resize=556,505',
        [
         new Ingredient('mutton',2),
         new Ingredient('masala',1),
         new Ingredient('rice',2)
            ])
    ];

    constructor(private slService: ShoppingListService){}

    recipeSelected = new EventEmitter<Recipe>();

    getRecipes() {
    return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
    }
}
