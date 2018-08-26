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

  protected _items: Place[];

  public Selected;

  constructor() {
    this.Refresh();
  }

  public get Items(): Place[] {
    return this._items;
  }

  protected get SingleConfig(): DropdownConfig {
    return {
      templateBy: this.TemplateBy,
    };
  }

  protected get MultiConfig(): DropdownConfig {
    return {
      multiSelect: true,
    };
  }

  public TemplateBy(item: Place): string {
    return 'option';
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
