import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { TemplateNameDirective } from '../../directives/template-name.directive';
import { DropdownItem } from '../../data-types/dropdown-item.interface';
import { DropdownConfig } from '../../config/config.interface';
import { DefaultConfig } from '../../config/default.config';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges {

  @Input() public model: any;
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public items: DropdownItem<any, any>[];

  @Input() public config: DropdownConfig = DefaultConfig;

  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  protected _open = false;
  protected _selected = null;

  protected _groups: Map<string, DropdownItem<any, any>[]>;
  protected _selectedItems?: Map<string, any>;

  constructor(protected eRef: ElementRef) {
    this._groups = new Map<string, DropdownItem<any, any>[]>();
    this._selectedItems = new Map<string, any>();
  }

  protected get Groups(): Map<string, DropdownItem<any, any>[]> {
    return this._groups;
  }

  protected get SelectedItems(): Map<string, any> {
    return this._selectedItems;
  }

  protected Select(item: DropdownItem<any, any>): void {
    if (this.config.multiSelect) {
      if (this._selectedItems.has(item.id)) {
        this._selectedItems.delete(item.id);
      } else if (!this.config.multiSelectLimit || this._selectedItems.size < this.config.multiSelectLimit) {
        this._selectedItems.set(item.id, item.data);
      }
      this.modelChange.emit(Array.from(this._selectedItems.values()));
    } else {
      this.modelChange.emit(item.data);
    }
  }

  protected ItemsChanged(): void {
    const groups = new Map<string, DropdownItem<any, any>[]>();
    this.items.forEach(item => {
      const groupName = item.groupBy || null;
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName).push(item);
    });
    this._groups = groups;
  }

  public Close(): void {
    this._open = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.config = Object.assign({}, DefaultConfig, this.config);
    }
    if (changes.items) {
      this.ItemsChanged();
    }
  }

}
