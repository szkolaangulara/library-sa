import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

const COMPONENTS: any[] = [
  MatExpansionModule
];

@NgModule({
  imports: [
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ]
})
export class MaterialModule {
}
