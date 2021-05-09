import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import localePL from '@angular/common/locales/pl';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {NgxMaskModule} from 'ngx-mask';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePL);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
