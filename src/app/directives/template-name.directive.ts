import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTemplateName]'
})
export class TemplateNameDirective {

  @Input() private appTemplateName: string;

  constructor(private template: TemplateRef<any>) { }

  public get Name(): string {
    return this.appTemplateName;
  }

  public get Template(): TemplateRef<any> {
    return this.template;
  }

}
