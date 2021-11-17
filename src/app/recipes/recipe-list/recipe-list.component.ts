import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes: Recipe[] ;
    /*recipes: Recipe[] = [
     new Recipe('Chicken Biriyani','This is a Recipe for Chicken Biriyani',
    'https://user-images.immediate.co.uk/bbcgoodfood/recipes/user-recipe/url_4.jpg?quality=90&resize=556,505'),
     new Recipe('Mutton Biriyani','This is a Recipe for Mutton Biriyani',
        'https://user-images.immediate.co.uk/bbcgoodfood/recipes/user-recipe/url_4.jpg?quality=90&resize=556,505')
    ]; */

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  this.recipes= this.recipeService.getRecipes();
  }

  /* onRecipeSelected(recipeSelected:Recipe){
  this.recipeSelected.emit(recipeSelected);
  } */
}
