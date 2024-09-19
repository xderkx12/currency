import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Currency } from '../Types/currency';
import { DateConverterService } from './date-converter-service.service';
import { ArrayUtilsService } from './array-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyHTTPService {

  private apiUrl = 'https://api.nbrb.by/exrates/';
  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of all currencies with periodicity = 0 (daily).
   * 
   * @returns Observable<Currency[]> - Array of currency objects.
   */
  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + 'rates?periodicity=0');
  }
  
  /**
   * Fetches the list of currencies on a specific date.
   * 
   * @param date - Date in the format "yyyy-mm-dd".
   * @returns Observable<Currency[]> - Array of currency objects for the specified date.
   */
  getCurrenciesOnDate(date: string): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + 'rates?ondate=' + date + '&periodicity=0')
  }

  /**
   * Fetches the exchange rate for a specific currency on a given date.
   * 
   * @param date - Date in the format "yyyy-mm-dd".
   * @param currentAbbreviation - Currency identifier.
   * @returns Observable<Currency[]> - Array of currency objects with rates for the specified currency and date.
   */
  getCurrencyRateOnDate(date: string, currentAbbreviation: string): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + 'rates/' + currentAbbreviation + '?parammode=2&ondate=' + date);
  }

  /**
    * get the exchange rates on the date range in one month increments
    * @param StartDate start date in the format "yyyy-mm-dd"
    * @param EndDate end date in the format "yyyy-mm-dd"
    * @param currentAbbreviation currency identifier
    * @returns Observable<Currency[]> array of currencies for each month in the interval
  */
  getCurrenciesOnIntervalDate(startDate: string, endDate: string, currentAbbreviation: string): Observable<Currency[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = DateConverterService.getMonthlyDatesInRange(start, end);
    const requests = this.generateCurrencyRequests(dates, currentAbbreviation);

    return forkJoin(requests).pipe(
      map(ArrayUtilsService.flattenResults)
    );
  }

  /**
   * Generates HTTP requests for fetching currency rates for a list of dates.
   * 
   * @param dates - Array of dates in the format "Date[]".
   * @param currentAbbreviation - Currency identifier.
   * @returns Observable<Currency[]>[] - Array of HTTP requests for each date.
   */
  private generateCurrencyRequests(dates: Date[], currentAbbreviation: string): Observable<Currency[]>[] {
    return dates.map(date => {
      const formattedDate = DateConverterService.getFormattedDate(date);
      return this.getCurrencyRateOnDate(formattedDate, currentAbbreviation);
    });
  }
}
