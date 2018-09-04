import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TemplateNameDirective } from './directives/template-name.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { IterableMapPipe } from './pipes/iterable-map.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LimitPipe } from './pipes/limit.pipe';
import { FilterMapValuePipe } from './pipes/filter-map-value.pipe';

@NgModule({
    declarations: [
        TemplateNameDirective,
        IterableMapPipe,
        ClickOutsideDirective,
        LimitPipe,
        FilterMapValuePipe,
        DropdownComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: [
        TemplateNameDirective,
        IterableMapPipe,
        ClickOutsideDirective,
        LimitPipe,
        FilterMapValuePipe,
        DropdownComponent,
    ],
    providers: [],
    bootstrap: []
})
export class DropdownModule { }
