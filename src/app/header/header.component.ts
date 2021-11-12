import { Component,EventEmitter,Output } from '@angular/core';


@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})
export class HeaderComponent {

@Output('menuItem') menuItem = new EventEmitter<string>();

  onSelected(menuItemSelected:string) {
  this.menuItem.emit(menuItemSelected);
  }
}
