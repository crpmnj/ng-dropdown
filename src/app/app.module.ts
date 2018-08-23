import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateNameDirective } from './directives/template-name.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IterableMapPipe } from './pipes/iterable-map.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TemplateNameDirective,
    DropdownComponent,
    IterableMapPipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
