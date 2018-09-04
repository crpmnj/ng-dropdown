import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TemplateNameDirective } from './directives/template-name.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IterableMapPipe } from './pipes/iterable-map.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LimitPipe } from './pipes/limit.pipe';
import { FilterMapValuePipe } from './pipes/filter-map-value.pipe';

const components: any[] = [
    TemplateNameDirective,
    IterableMapPipe,
    ClickOutsideDirective,
    LimitPipe,
    FilterMapValuePipe,
    DropdownComponent,
];

@NgModule({
    declarations: components,
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: components,
    providers: [],
    bootstrap: []
})
export class DropdownModule { }
