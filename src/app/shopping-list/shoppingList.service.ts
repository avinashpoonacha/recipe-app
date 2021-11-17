import { EventEmitter } from'@angular/core';
import { Ingredient } from '../common/ingredient.model';

export class ShoppingListService {

ingredientChanged = new EventEmitter<Ingredient[]>();
 private ingredients: Ingredient[] = [
  new Ingredient('Rice',1),
  new Ingredient('Chicken',2)
];

getIngredients() {
return this.ingredients.slice();
}

addIngredient(ingredient: Ingredient){
this.ingredients.push(ingredient);
this.ingredientChanged.emit(this.ingredients.slice());
}


addIngredients(ingredients:Ingredient[]){
/* for(let ingredient of ingredients){
this.addIngredient(ingredient);
}  lot of emits */

this.ingredients.push(...ingredients); // cannot use array items , use ...
this.ingredientChanged.emit(this.ingredients.slice());
}
}
