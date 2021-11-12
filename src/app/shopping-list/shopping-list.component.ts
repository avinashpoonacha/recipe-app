import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../common/ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
  new Ingredient('Rice',1),
  new Ingredient('Chicken',2)
];

  constructor() { }

  ngOnInit(): void {
  }

  onIngAdded(ingAdded:Ingredient){
 this.ingredients.push(ingAdded);
  }

}
