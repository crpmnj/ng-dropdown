import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[templateName]'
})
export class TemplateNameDirective {

  @Input() private templateName: string;

  constructor(private template: TemplateRef<any>) { }

  public get Name(): string {
    return this.templateName;
  }

  public get Template(): TemplateRef<any> {
    return this.template;
  }

}
