import { v4 as uuidv4 } from 'uuid';
import { Component } from '@angular/core';
import { DropdownItem } from './data-types/dropdown-item.interface';
import { DropdownConfig } from './config/config.interface';
import { Place } from './example/place.class';
import { Country } from './example/country.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected _items: any[];
  protected _dropdownItems: DropdownItem<uuidv4, uuidv4>[];
  protected _selected: uuidv4;
  protected _selectedItems: uuidv4[];

  constructor() {
    this.Refresh();
  }

  protected get Config(): DropdownConfig {
    return {
      multiSelect: true,
    };
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

  protected get Items(): any[] {
    return this._items;
  }

  public Refresh(): void {
    const russia: Country = { id: uuidv4(), name: 'Россия' };
    const belgium: Country = { id: uuidv4(), name: 'Бельгия' };
    const france: Country = { id: uuidv4(), name: 'Франция' };
    const items: Place[] = [];
    items.push({ id: uuidv4(), name: 'Москва', country: russia });
    items.push({ id: uuidv4(), name: 'Рязань', country: russia });
    items.push({ id: uuidv4(), name: 'Санкт-Петербург', country: russia });
    items.push({ id: uuidv4(), name: 'Казань', country: russia });
    items.push({ id: uuidv4(), name: 'Париж', country: france });
    items.push({ id: uuidv4(), name: 'Орлеан', country: france });
    items.push({ id: uuidv4(), name: 'Лион', country: france });
    items.push({ id: uuidv4(), name: 'Брюсель', country: belgium });
    items.push({ id: uuidv4(), name: 'Брюгге', country: belgium });
    this._items = items;
  }

}
