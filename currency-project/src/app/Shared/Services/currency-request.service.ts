import { Injectable } from '@angular/core';
import { CurrencyHTTPService } from './currency-http-service.service';
import { DateConverterService } from './date-converter-service.service';
import { Observable } from 'rxjs';
import { Currency } from '../Types/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRequestService {

  constructor(private currencyHTTPService: CurrencyHTTPService) {}

  /**
   * Generates HTTP requests for fetching currency rates for a list of dates.
   * 
   * @param dates - Array of dates in the format "Date[]".
   * @param currencyId - Currency identifier.
   * @returns Observable<Currency[]>[] - Array of HTTP requests for each date.
   */
  generateCurrencyRequests(dates: Date[], currencyId: string): Observable<Currency[]>[] {
    return dates.map(date => {
      const formattedDate = DateConverterService.getFormattedDate(date);
      return this.currencyHTTPService.getCurrencyRateOnDate(formattedDate, currencyId);
    });
  }
}
