import { Component } from '@angular/core';
import { CurrencyHTTPService } from '../../Shared/Services/currency-http-service.service';
import { Currency } from '../../Shared/Types/currency';
import { CurrenciesService } from '../../Shared/Services/currencies-service.service';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrl: './archive-page.component.scss'
})
export class ArchivePageComponent {

  currencies: Currency[] = [];

  //form date
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  selectedCurrency: string | null = null;

  constructor(private currencyHTTPService: CurrencyHTTPService, private currenciesService: CurrenciesService) {}

  //get and set all currencies from API
  private initializeCurrencies(): void {
    this.currencyHTTPService.getCurrencies().subscribe(data => {
      this.currencies = this.currenciesService.sortByName(this.currenciesService.getUniqCurrencies(data));
    });
  }

  //initialization all elements on page
  ngOnInit(): void {
    this.initializeCurrencies();
  }

  onSubmit(): void {
    if (this.selectedStartDate && this.selectedEndDate && this.selectedCurrency) {
      this.currencyHTTPService.getCurrenciesOnIntervalDate(this.selectedStartDate, this.selectedEndDate, this.selectedCurrency).subscribe(data => {
        console.log(data);
      });
    }
  }
}
