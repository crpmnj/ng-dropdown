import { Component, Input, Output, EventEmitter, ContentChildren, QueryList,
  OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { DropdownItem, TemplateNameDirective, DropdownGroup } from '../..';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnChanges {

  @Input() public model: any;
  @Output() public modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() public items: DropdownItem[];

  @ContentChildren(TemplateNameDirective) templates: QueryList<TemplateNameDirective>;

  protected _open = false;
  protected _selected = null;

  protected _groups: DropdownGroup[];

  constructor(protected eRef: ElementRef) { }

  public Close(): void {
    this._open = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
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
