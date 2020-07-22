import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelper {

  constructor() {
  }

  static getDateDifferenceInDays(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return Math.floor(
      (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(),
        startDate.getMonth(), startDate.getDate())) / (1000 * 60 * 60 * 24)
    );
  }
}
