import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TemplateNameDirective } from '../../directives/template-name.directive';
import { DropdownItem } from '../../data-types/dropdown-item.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {

  @Input() public model: any;
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public items: DropdownItem<any, any>[];

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

  protected OnSelect(item: any): void {
    console.log('selected', item);
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
    if (changes.items) {
      this.ItemsChanged();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onClick($event: MouseEvent): void {
    if (this._open) {
      if (!this.eRef.nativeElement.contains($event.target)) {
        this.Close();
      }
    }
  }

}
