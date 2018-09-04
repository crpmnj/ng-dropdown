# Simple angular 2 dropdown component

Use this component to create a custom drop-down list on your page.

# Install
```
$ npm install @malekp/ng-dropdown
```

# Usage

### `app.module.ts`

```typescript
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### `app.component.html`

```html
<ng-dropdown [items]="Items" [(model)]="Selected" [config]="{ groupBy: Group, searchBy: Filter, templateBy: Template }">
    <ng-template templateName="super" let-item>{{ item.Title }}</ng-template>
</ng-dropdown>
```
