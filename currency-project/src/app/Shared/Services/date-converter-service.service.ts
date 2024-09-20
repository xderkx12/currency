import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateConverterService {
  /**
   * format a date from a date object to a string "yyyy-mm-dd"
   * @param date date object for formatting
   * @returns date string "yyyy-mm-dd".
   */
  public static getFormattedDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  /**
   * format a date from a date object to a string "yyyy-mm-dd"
   * @param date date object for formatting
   * @returns date string "yyyy-mm-dd".
   */
  public getFormattedDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  /**
   * get dates in one month increments
   * @param StartDate start date in the format "yyyy-mm-dd"
   * @param EndDate end date in the format "yyyy-mm-dd"
   * @returns Date[] array of dates based on the interval.
   */
  public static getMonthlyDatesInRange(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return dates;
  }
}
