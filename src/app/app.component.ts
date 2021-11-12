import { Component,Output } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app';
  menuItem:string='recipe';


  onMenuItemClick(menuItemSelected:string){
  this.menuItem = menuItemSelected;
  }
}
