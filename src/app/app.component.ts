import { v4 as uuidv4 } from 'uuid';
import { Component } from '@angular/core';
import { DropdownItems } from '.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  protected _items: DropdownItems;
  protected _selected: uuidv4;

  constructor() {
    this._items = new DropdownItems();
    for (let i = 0; i < 5; i++) {
      this._items.set(uuidv4(), uuidv4());
    }
  }

  protected get Selected(): uuidv4 {
    return this._selected;
  }

  protected get Items(): DropdownItems {
    return this._items;
  }

}
