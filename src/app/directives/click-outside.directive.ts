import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() public clickOutside = new EventEmitter<MouseEvent>();

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  protected onClick($event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains($event.target)) {
      this.clickOutside.emit($event);
    }
  }

}
