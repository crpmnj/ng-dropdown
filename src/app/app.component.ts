import { v4 as uuidv4 } from 'uuid';
import { Component } from '@angular/core';
import { DropdownItem } from './data-types/dropdown-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected _items: DropdownItem<uuidv4, uuidv4>[];
  protected _selected: uuidv4;
  protected _selectedItems: uuidv4[];

  constructor() {
    this.Refresh();
  }

  protected get Selected(): uuidv4 {
    return this._selected;
  }

  protected set Selected(value: uuidv4) {
    this._selected = value;
  }

  protected get SelectedItems(): uuidv4[] {
    return this._selectedItems;
  }

  protected set SelectedItems(value: uuidv4[]) {
    this._selectedItems = value;
  }

  protected get Items(): DropdownItem<uuidv4, uuidv4>[] {
    return this._items;
  }

  public Refresh(): void {
    this._items = [];
    for (let i = 0; i < 5; i++) {
      this._items.push({ id: uuidv4(), data: uuidv4() });
    }
    this._items[1].groupBy = 'first group';
    this._items[2].groupBy = 'first group';
    this._items[0].groupBy = 'second group';
  }

}
