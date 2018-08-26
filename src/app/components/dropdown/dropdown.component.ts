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

  @Input() public model: any | any[];
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public items: any[];

  @Input() public config: DropdownConfig = DefaultConfig;

  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  protected _open = false;

  protected _selected: DropdownItem;
  protected _selectedItems: DropdownItem[];

  protected _ungroupedItems: DropdownItem[];
  protected _groupedItems = new Map<string, DropdownItem[]>();

  constructor(protected eRef: ElementRef) { }

  public get Groups(): Map<string, DropdownItem[]> {
    return this._groupedItems;
  }

  public get Selected(): DropdownItem {
    return this._selectedItems[0];
  }

  public get SelectedItems(): DropdownItem[] {
    return this._selectedItems;
  }

  public Template(item: DropdownItem, alt?: string): TemplateRef<any> {
    const templateName = item && item.templateName || alt;
    if (templateName) {
      const template = this.templates.find(tmpl => tmpl.Name === templateName);
      return template && template.Template;
    }
    return null;
  }

  public Close(): void {
    this._open = false;
  }

  protected GetItemName(item: any): string {
    if (this.config.nameBy) {
      return this.config.nameBy(item);
    }
    return null;
  }

  protected GetGroupName(item: any): string {
    if (this.config.groupBy) {
      return this.config.groupBy(item);
    }
    return null;
  }

  protected GetTemplateName(item: any): string {
    if (this.config.templateBy) {
      return this.config.templateBy(item);
    }
    return null;
  }

  protected GetValue(item: any): any {
    if (this.config.valueBy) {
      return this.config.valueBy(item);
    } else {
      return item;
    }
  }

  protected IsSelected(value: any): boolean {
    if (this.config.multiSelect) {
      return this.model && this.model.find(selected => selected === value);
    } else {
      return this.model === value;
    }
  }

  protected ItemsChanged(): void {
    this._ungroupedItems = this.items && this.items.map(item => {
      return {
        data: item,
        value: this.GetValue(item),
        name: this.GetItemName(item),
        groupName: this.GetGroupName(item),
        templateName: this.GetTemplateName(item),
        selected: false,
      } as DropdownItem;
    });
    const groups = new Map<string, DropdownItem[]>();
    this._ungroupedItems.forEach(item => {
      if (!groups.has(item.groupName)) {
        groups.set(item.groupName, []);
      }
      groups.get(item.groupName).push(item);
    });
    this._groupedItems = groups;
  }

  protected UpdateSelected(): void {
    this._selectedItems = this._ungroupedItems.filter(item => {
      item.selected = this.IsSelected(item.data);
      return item.selected;
    });
  }

  protected OnClick(clicked: DropdownItem): void {
    if (this.config.multiSelect) {
      if (clicked.selected) {
        clicked.selected = false;
      } else if (!this.config.multiSelectLimit || this.model.length < this.config.multiSelectLimit) {
        clicked.selected = true;
      }
      this.modelChange.emit(this._ungroupedItems.filter(item => item.selected).map(item => item.value));
    } else {
      this.modelChange.emit(clicked.value);
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
