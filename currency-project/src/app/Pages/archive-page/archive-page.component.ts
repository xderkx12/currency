import { Component, OnInit } from '@angular/core';
import { CurrencyHTTPService } from '../../Shared/Services/currency-http-service.service';
import { Currency } from '../../Shared/Types/currency';
import { CurrenciesService } from '../../Shared/Services/currencies-service.service';
import { DateConverterService } from '../../Shared/Services/date-converter-service.service';

@Component({
  selector: 'app-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss'],
})
export class ArchivePageComponent implements OnInit {
  currencies: Currency[] = [];
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  selectedCurrency: string | null = null;

  chartData: { date: string; rate: number }[] = [];
  chartLabel: string = '';

  isShowGraph: boolean = false;

  constructor(
    private currencyHTTPService: CurrencyHTTPService,
    private currenciesService: CurrenciesService,
  ) {}

  private initializeCurrencies(): void {
    this.currencyHTTPService.getCurrencies().subscribe((data) => {
      this.currencies = this.currenciesService.sortByName(
        this.currenciesService.getUniqCurrencies(data),
      );
    });
  }

  ngOnInit(): void {
    this.initializeCurrencies();
  }

  showGraph(): void {
    this.isShowGraph = true;
  }

  onSubmit(): void {
    this.showGraph();
    if (
      this.selectedStartDate &&
      this.selectedEndDate &&
      this.selectedCurrency
    ) {
      this.chartLabel = `${this.selectedCurrency} курс`;
      this.showGraph();
      this.currencyHTTPService
        .getCurrenciesOnIntervalDate(
          this.selectedStartDate,
          this.selectedEndDate,
          this.selectedCurrency,
        )
        .subscribe((data) => {
          this.chartData = data.map((currency) => {
            const rate = currency.Cur_OfficialRate > 10 ? currency.Cur_OfficialRate / 10000 : currency.Cur_OfficialRate;
            return {
              date: DateConverterService.getFormattedDate(new Date(currency.Date)),
              rate: rate,
            }
          })
        });
    }
  }
}
