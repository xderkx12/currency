import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyRatesPageComponent } from './Pages/currency-rates-page/currency-rates-page.component';
import { ArchivePageComponent } from './Pages/archive-page/archive-page.component';
import { HeadComponent } from './Shared/Components/head/head.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyRatesPageComponent,
    ArchivePageComponent,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
