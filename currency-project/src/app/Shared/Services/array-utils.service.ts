import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArrayUtilsService {
  /**
   * Flattens a two-dimensional array into a single-dimensional array.
   *
   * @param results - A two-dimensional array of type T.
   * @returns A flattened single-dimensional array of type T.
   */
  public static flattenResults<T>(results: T[][]): T[] {
    return results.reduce((acc, val) => acc.concat(val), []);
  }
}
