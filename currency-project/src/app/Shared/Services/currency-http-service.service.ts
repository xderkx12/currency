import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../Types/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyHTTPService {

  private apiUrl = 'https://api.nbrb.by/exrates/';
  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + 'rates?periodicity=0');
  }
  
  getCurrenciesOnDate(date: string): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + 'rates?ondate=' + date + '&periodicity=0')
  }
}
