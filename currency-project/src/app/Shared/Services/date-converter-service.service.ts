import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  public getFormattedDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
