import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateNameDirective } from './directives/template-name.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IterableMapPipe } from './pipes/iterable-map.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [
    AppComponent,
    TemplateNameDirective,
    DropdownComponent,
    IterableMapPipe,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ClickOutsideDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
