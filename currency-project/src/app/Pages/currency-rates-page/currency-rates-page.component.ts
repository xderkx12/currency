import { Component } from '@angular/core';
import { CurrencyHTTPService } from '../../Shared/Services/currency-http-service.service';
import { Currency } from '../../Shared/Types/currency';
import { CurrenciesService } from '../../Shared/Services/currencies-service.service';
import { DateConverterService } from '../../Shared/Services/date-converter-service.service';

@Component({
  selector: 'app-currency-rates-page',
  templateUrl: './currency-rates-page.component.html',
  styleUrls: ['./currency-rates-page.component.scss'] // исправлено styleUrl на styleUrls
})
export class CurrencyRatesPageComponent {

  currencies: Currency[] = [];
  currenciesOnDate: Currency[] = [];
  filtredCurrencies: Currency[] = [];

  //form date
  selectedDate: string | null = null;
  selectedCurrency: string | null = null;

  constructor(private currencyHTTPService: CurrencyHTTPService, private currenciesService: CurrenciesService, private dateConverter: DateConverterService) {}

  //initialization all elements on page
  ngOnInit(): void {
    this.setCurrentDay();
    this.initializeCurrencies();
  }

  //set current day in data input
  setCurrentDay(): void {
    this.selectedDate = this.dateConverter.getFormattedDate(new Date());
    console.log(this.selectedDate);
  }

  //get and set all currencies from API
  private initializeCurrencies(): void {
    this.currencyHTTPService.getCurrencies().subscribe(data => {
      this.currencies = this.currenciesService.sortByName(this.currenciesService.getUniqCurrencies(data));
      this.showAllCurrenciesToday();
    });
  }

  //set the currencies rate for today
  private showAllCurrenciesToday(): void {
    this.filtredCurrencies = [...this.currencies];
  }

  //the function that is triggered when processing the form
  onSubmit(): void {
    if (this.selectedCurrency) {
      this.selectedCurrency === 'null' ? this.showAllCurrenciesOnDate() : this.filterSelectedCurrency();
    } else {
      this.showAllCurrenciesToday();
    }
    console.log(this.selectedDate);
  }

  //filtration currencies with data from the form
  private filterSelectedCurrency(): void {
    if (this.selectedDate) {
      this.getCurrenciesOnDate(() => {
        this.filtredCurrencies = this.currenciesOnDate.filter(currency => currency.Cur_Abbreviation === this.selectedCurrency);
      });
    } else {
      this.filtredCurrencies = this.currencies.filter(currency => currency.Cur_Abbreviation === this.selectedCurrency);
    }
  }
  
  //get currencies on selected date
  private getCurrenciesOnDate(callback?: () => void): void {
    if (!this.selectedDate) return;
    
    this.currencyHTTPService.getCurrenciesOnDate(this.selectedDate).subscribe(data => {
      this.currenciesOnDate = this.currenciesService.sortByName(this.currenciesService.getUniqCurrencies(data));
      if (callback) callback();
    });
  }

  //show all currencies on selected date
  private showAllCurrenciesOnDate(): void {
    this.getCurrenciesOnDate(() => {
      this.filtredCurrencies = [...this.currenciesOnDate];
    });
  }
}
