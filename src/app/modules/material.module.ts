import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

const COMPONENTS: any[] = [
  MatTooltipModule,
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
