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

  public Selected;

  public SelectedItems: any[];

  constructor() {
    this.Refresh();
  }

  public get Items(): Place[] {
    return this._items;
  }

  public Group(item: any): string {
    return item[0] % 2 === 0 ? 'Четные' : 'Нечетные';
  }

  public Filter(item: string, expr: string): boolean {
    return expr ? item.toLowerCase().includes(expr.toLowerCase()) : true;
  }

  public Refresh(): void {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push(uuidv4());
    }
    this._items = items;
  }

}
