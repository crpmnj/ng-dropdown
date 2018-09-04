import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, ElementRef, TemplateRef } from '@angular/core';
import { TemplateNameDirective } from '../../directives/template-name.directive';
import { DefaultConfig } from '../../config/default.config';
import { DropdownConfig } from '../../config/config.interface';
import { DropdownItem } from '../../data-types/dropdown-item.interface';

@Component({
  selector: 'ng-dropdown',
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
   * Search expression
   */
  protected _search = '';

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

  public get SelectedCount(): number {
    return this._selectedItems.length;
  }

  public get Search(): string {
    return this._search;
  }

  public set Search(value: string) {
    this._search = value;
    this.GroupItems();
  }

  public get GroupsCount(): number {
    return this._groupedItems.size;
  }

  /**
   * Hide list of options
   */
  public Close(): void {
    this._open = false;
  }

  public Open(): void {
    this._open = true;
  }

  public Toggle(): void {
    this._open = !this._open;
  }

  /**
   * Returns template with target name
   * @param tname Priority template name
   * @param alt Alternative template name
   */
  public Template(tname: string, ...alt): TemplateRef<any> {
    let template = this.templates.find(tmpl => tmpl.Name === tname);
    if (!template && alt.length) {
      template = alt.reduce((res, name) => {
        return res || this.templates.find(tmpl => tmpl.Name === name);
      }, null);
    }
    return template && template.Template;
  }

  /**
   * Select or deselect item
   * @param key Item key
   */
  protected Select(key): void {
    if (this.multiple) {
      if (this.model) {
        if (this.model.indexOf && this.model.filter && this.model.concat) {
          if (this.model.indexOf(key) > -1) {
            this.modelChange.emit(this.model.filter(item => item !== key));
          } else if (!this.config.multipleLimit || this.model.length < this.config.multipleLimit) {
            this.modelChange.emit([...this.model, key]);
          }
        } else {
          throw new TypeError('Array expected');
        }
      } else {
        if (this.config.multipleLimit === undefined || this.config.multipleLimit > 0) {
          this.modelChange.emit([key]);
        }
      }
    } else {
      this.modelChange.emit(key);
      this.Close();
    }
  }

  /**
   * Returns item value
   * @param item Target item
   */
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

  /**
   * Returns item groupname
   * @param item Target item
   */
  protected GetGroupname(item: any): string {
    if (!this.config.groupBy) {
      return null;
    } else if (typeof(this.config.groupBy) === 'function') {
      return this.config.groupBy(item);
    } else {
      throw new TypeError('Function expected');
    }
  }

  protected GetTemplate(item: any): string {
    if (!this.config.templateBy) {
      return null;
    } else if (typeof(this.config.templateBy) === 'function') {
      return this.config.templateBy(item);
    } else {
      throw new TypeError('Function expected');
    }
  }

  protected GetName(item: any): string {
    if (!this.config.nameBy) {
      return null;
    } else if (typeof(this.config.nameBy) === 'function') {
      return this.config.nameBy(item);
    } else {
      throw new TypeError('Function expected');
    }
  }

  protected Filter(item: any): boolean {
    if (this.config.searchBy && this._search.length > 0) {
      return this.config.searchBy(item, this._search);
    } else {
      return true;
    }
  }

  /**
   * Generate new Map of dropdown items
   */
  protected ItemsChanged(): void {
    const map = new Map<any, DropdownItem>();
    this.items.forEach(item => {
      const key = this.GetValue(item);
      map.set(key, {
        data: item,
        key: key,
        selected: false,
        templateName: this.GetTemplate(item),
        name: this.GetName(item),
      });
    });
    this._itemsMap = map;
    this.GroupItems();
  }

  /**
   * Generate new Map of dropdown groups of items
   */
  protected GroupItems(): void {
    const map = new Map<string, DropdownItem[]>();
    this._itemsMap.forEach(item => {
      if (!this.Filter(item.data)) {
        return;
      }
      const gname = this.GetGroupname(item.data);
      item.groupName = gname;
      if (!map.has(gname)) {
        map.set(gname, []);
      }
      map.get(gname).push(item);
    });
    this._groupedItems = map;
  }

  /**
   * Calculating `selected` property for every dropdown items
   */
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
      this._selected = null;
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
