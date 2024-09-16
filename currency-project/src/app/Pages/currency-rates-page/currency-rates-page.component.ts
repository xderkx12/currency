import { Component } from '@angular/core';
import { CurrencyHTTPService } from '../../Shared/Services/currency-http-service.service';
import { Currency } from '../../Shared/Types/currency';
import { CurrenciesService } from '../../Shared/Services/currencies-service.service';

@Component({
  selector: 'app-currency-rates-page',
  templateUrl: './currency-rates-page.component.html',
  styleUrls: ['./currency-rates-page.component.scss'] // исправлено styleUrl на styleUrls
})
export class CurrencyRatesPageComponent {

  currencies: Currency[] = [];
  currenciesOnDate: Currency[] = [];
  filtredCurrencies: Currency[] = [];

  selectedDate: Date | null = null;
  selectedCurrency: string | null = null;

  constructor(private currencyHTTPService: CurrencyHTTPService, private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.initializeCurrencies();
  }

  private initializeCurrencies(): void {
    this.currencyHTTPService.getCurrencies().subscribe(data => {
      this.currencies = this.currenciesService.sortByName(this.currenciesService.getUniqCurrencies(data));
      this.showAllCurrenciesToday();
    });
  }

  private showAllCurrenciesToday(): void {
    this.filtredCurrencies = [...this.currencies];
  }

  onSubmit(): void {
    if (this.selectedCurrency) {
      this.selectedCurrency === 'null' ? this.showAllCurrenciesOnDate() : this.filterSelectedCurrency();
    } else {
      this.showAllCurrenciesToday();
    }
  }

  private filterSelectedCurrency(): void {
    if (this.selectedDate) {
      this.getCurrenciesOnDate(() => {
        this.filtredCurrencies = this.currenciesOnDate.filter(currency => currency.Cur_Abbreviation === this.selectedCurrency);
      });
    } else {
      this.filtredCurrencies = this.currencies.filter(currency => currency.Cur_Abbreviation === this.selectedCurrency);
    }
  }

  private getCurrenciesOnDate(callback?: () => void): void {
    if (!this.selectedDate) return;
    
    this.currencyHTTPService.getCurrenciesOnDate(this.selectedDate).subscribe(data => {
      this.currenciesOnDate = this.currenciesService.sortByName(this.currenciesService.getUniqCurrencies(data));
      if (callback) callback();
    });
  }

  private showAllCurrenciesOnDate(): void {
    this.getCurrenciesOnDate(() => {
      this.filtredCurrencies = [...this.currenciesOnDate];
    });
  }
}
