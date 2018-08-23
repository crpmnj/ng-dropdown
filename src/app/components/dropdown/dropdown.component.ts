import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { TemplateNameDirective } from '../../directives/template-name.directive';
import { DropdownItem } from '../../data-types/dropdown-item.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges {

  @Input() public model: any;
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public items: DropdownItem<any, any>[];

  @Input() public multiSelect = false;

  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  protected _open = false;
  protected _selected = null;

  protected _groups: Map<string, DropdownItem<any, any>[]>;

  constructor(protected eRef: ElementRef) {
    this._groups = new Map<string, DropdownItem<any, any>[]>();
  }

  protected get Groups(): Map<string, DropdownItem<any, any>[]> {
    return this._groups;
  }

  protected Select(item: DropdownItem<any, any>): void {
    this.modelChange.emit(item.data);
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
    console.log('closed');
    this._open = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.ItemsChanged();
    }
  }

}
