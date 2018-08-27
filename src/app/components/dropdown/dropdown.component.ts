import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, ElementRef, TemplateRef } from '@angular/core';
import { TemplateNameDirective } from '../../directives/template-name.directive';
import { DefaultConfig } from '../../config/default.config';
import { DropdownConfig } from '../../config/config.interface';
import { DropdownItem } from '../../data-types/dropdown-item.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges {

  /**
   * Output selected item
   */
  @Input() public model: any | any[];
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Input items
   */
  @Input() public items: any[];

  /**
   * Function or string for calculate item value
   */
  @Input() public valueBy: Function | string;

  /**
   * A flag indicating that multiple selection enabled
   * @default false
   */
  @Input() public multiple = false;

  /**
   * Configuration
   */
  @Input() public config: DropdownConfig = DefaultConfig;

  /**
   * Received named templates
   */
  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  /**
   * A flag indicating that the list of options is visible
   */
  protected _open = false;

  /**
   * Map of items where key is item value
   */
  protected _itemsMap: Map<any, DropdownItem> = new Map<any, DropdownItem>();

  /**
   * Grouped Map of items where key is items group
   */
  protected _groupedItems: Map<string, DropdownItem[]> = new Map<string, DropdownItem[]>();

  /**
   * Selected item when multiple selection disabled
   */
  protected _selected: DropdownItem;

  /**
   * Selected items when multiple selection enabled
   */
  protected _selectedItems: DropdownItem[];

  constructor(protected eRef: ElementRef) { }

  public get Groups(): Map<string, DropdownItem[]> {
    return this._groupedItems;
  }

  public get Selected(): DropdownItem {
    return this._selected;
  }

  public get SelectedItems(): DropdownItem[] {
    return this._selectedItems;
  }

  /**
   * Hide list of options
   */
  public Close(): void {
    this._open = false;
  }

  protected Select(key): void {
    if (this.multiple) {
      if (this.model) {
        if (this.model.indexOf && this.model.filter && this.model.concat) {
          if (this.model.indexOf(key) === -1) {
            this.modelChange.emit([...this.model, key]);
          } else {
            this.modelChange.emit(this.model.filter(item => item !== key));
          }
        } else {
          throw new TypeError('Array expected');
        }
      } else {
        this.modelChange.emit([key]);
      }
    } else {
      this.modelChange.emit(key);
    }
  }

  protected GetValue(item: any): any {
    if (!this.valueBy) {
      return item;
    } else if (typeof(this.valueBy) === 'string') {
      return item[this.valueBy];
    } else if (typeof(this.valueBy) === 'function') {
      return this.valueBy(item);
    } else {
      throw new TypeError('String or Function expected');
    }
  }

  protected GetGroupname(item: any): string {
    if (!this.config.groupBy) {
      return null;
    } else if (typeof(this.config.groupBy) === 'function') {
      return this.config.groupBy(item);
    } else {
      throw new TypeError('Function expected');
    }
  }

  protected ItemsChanged(): void {
    const map = new Map<any, DropdownItem>();
    this.items.forEach(item => {
      const key = this.GetValue(item);
      map.set(key, {
        data: item,
        key: key,
        selected: false,
      });
    });
    this._itemsMap = map;
    this.GroupItems();
  }

  protected GroupItems(): void {
    const map = new Map<string, DropdownItem[]>();
    this._itemsMap.forEach((item, key) => {
      const gname = this.GetGroupname(item);
      item.groupName = gname;
      if (!map.has(gname)) {
        map.set(gname, []);
      }
      map.get(gname).push(item);
    });
    this._groupedItems = map;
  }

  protected UpdateSelected(): void {
    if (this.multiple) {
      const selected = [];
      this._itemsMap.forEach(item => {
        item.selected = this.model && this.model.indexOf && this.model.indexOf(item.key) !== -1;
        if (item.selected) {
          selected.push(item);
        }
      });
      this._selectedItems = selected;
    } else {
      this._itemsMap.forEach(item => {
        item.selected = item.key === this.model;
        if (item.selected) {
          this._selected = item;
        }
      });
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.config = Object.assign({}, DefaultConfig, this.config);
    }
    if (changes.items || changes.model) {
      if (changes.items) {
        this.ItemsChanged();
      }
      this.UpdateSelected();
    }
  }

}
