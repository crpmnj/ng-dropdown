import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DropdownItems } from '../../data-types/dropdown-items.class';
import { DropdownGroup } from '../../data-types/dropdown-group.class';
import { TemplateNameDirective } from '../../directives/template-name.directive';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {

  @Input() public model: any;
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public items: DropdownItems;

  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  protected _open = false;
  protected _selected = null;

  protected _groups: BehaviorSubject<DropdownGroup>;

  constructor(protected eRef: ElementRef) {
    this._groups = new BehaviorSubject<DropdownGroup>(new DropdownGroup());
  }

  protected get Groups(): BehaviorSubject<DropdownGroup> {
    return this._groups;
  }

  protected OnSelect(item: any): void {
    console.log('selected', item);
  }

  public Close(): void {
    this._open = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items !== undefined) {
      const groups: DropdownGroup = new DropdownGroup();
      groups.set('default', this.items);
      this._groups.next(groups);
    }
  }

  @HostListener('document:click', ['$event'])
  protected OnClick($event: MouseEvent): void {
    if (this._open) {
      if (!this.eRef.nativeElement.contains($event.target)) {
        this.Close();
      }
    }
  }

}
