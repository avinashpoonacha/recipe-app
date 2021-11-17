import { Component, OnInit,ElementRef ,ViewChild} from '@angular/core';

import { Ingredient }  from '../../common/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

@ViewChild('inputName',{static: false}) inputNameRef:ElementRef;
@ViewChild('inputAmount',{static: false}) inputAmountRef:ElementRef;


  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }


onAddIngredient(){
const ingName = this.inputNameRef.nativeElement.value;
const ingAmount = this.inputAmountRef.nativeElement.value;
const ing = new Ingredient(ingName,ingAmount);
this.slService.addIngredient(ing);
}
}
