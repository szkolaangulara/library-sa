import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const COMPONENTS: any[] = [
  MatExpansionModule,
  MatProgressSpinnerModule
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
