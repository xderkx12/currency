import { Injectable } from '@angular/core';
import { Currency } from '../Types/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  constructor() { }

  getUniqCurrencies(currencies: Currency[]): Currency[] {
    const sennAbreviations = new Set<string>();

    return currencies.filter(currency => {
      if(!sennAbreviations.has(currency.Cur_Abbreviation)) {
        sennAbreviations.add(currency.Cur_Abbreviation);
        return true;
      }
      return false;
    });
  }

  sortByName(currencies: Currency[]): Currency[] {
    return currencies.sort((a, b) => a.Cur_Name.localeCompare(b.Cur_Name));
  }

}
