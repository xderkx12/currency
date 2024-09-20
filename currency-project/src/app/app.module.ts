import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyRatesPageComponent } from './Pages/currency-rates-page/currency-rates-page.component';
import { ArchivePageComponent } from './Pages/archive-page/archive-page.component';
import { HeadComponent } from './Shared/Components/head/head.component';
import { CurrencyElementComponent } from './Shared/Components/currency-element/currency-element.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyHTTPService } from './Shared/Services/currency-http-service.service';
import { FormsModule } from '@angular/forms';
import { CurrencyChartComponent } from './Shared/Components/currency-chart/currency-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyRatesPageComponent,
    ArchivePageComponent,
    HeadComponent,
    CurrencyElementComponent,
    CurrencyChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CurrencyHTTPService],
  bootstrap: [AppComponent],
})
export class AppModule {}
