import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {HelperPipe} from './pipes/helper.pipe';
import {AmountFormatPipe} from './pipes/amount-format.pipe';
import {SumFormatPipe} from './pipes/sum-format.pipe';
import {CurrencyFormatPipe} from './pipes/currency-format.pipe';
import {AsyncPipe} from '@angular/common';
import {AdViewsModule} from "./ad-views/ad-views.module";
import {AdComponentsModule} from "./ad-components/ad-components.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {NgxPermissionsModule} from "ngx-permissions";


@NgModule({
  declarations: [
    AppComponent,
    HelperPipe,
    AmountFormatPipe,
    SumFormatPipe,
    CurrencyFormatPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AdViewsModule,
    AdComponentsModule,
    MatExpansionModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [DatePipe, AmountFormatPipe, SumFormatPipe, AsyncPipe],
  exports: [
    AmountFormatPipe,
    CurrencyFormatPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
