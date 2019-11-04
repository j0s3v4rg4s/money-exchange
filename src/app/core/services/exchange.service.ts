import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LatestConvert } from '../../exchange/models/latestConvert';
import { HistoricalCurrency } from '../../exchange/models/historicalCurrency';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  /**
   * Get last change from base currency to other currency
   */
  getLatestCurrencyMoney(base: string, currency: string) {
    return this.http.get<LatestConvert>(
      `${environment.fixerUrl}latest?access_key=${environment.fixerKey}&base=${base}&symbols=${currency}`,
    );
  }

  historicalPrice(date: Date, base: string, currencies: string[]) {
    const symbols = currencies.join(',');
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    return this.http.get<HistoricalCurrency>(
      `${environment.fixerUrl}${formattedDate}?access_key=${environment.fixerKey}&base=${base}&symbols=${symbols}`,
    );
  }
}
