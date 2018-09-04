import { v4 as uuidv4 } from 'uuid';
import { Component } from '@angular/core';
import { Place } from './example/place.class';

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

  public Template(item: any): string {
    return 'super';
  }

  public Group(item: any): string {
    return item.Title[0] % 2 === 0 ? 'Четные' : 'Нечетные';
  }

  public Filter(item: any, expr: string): boolean {
    return expr ? item.Title.toLowerCase().includes(expr.toLowerCase()) : true;
  }

  public Refresh(): void {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({ id: uuidv4(), Title: uuidv4() });
    }
    this.SelectedItems = [items[1], items[4], items[0]];
    this._items = items;
  }

}
