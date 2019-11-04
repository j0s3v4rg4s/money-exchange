import { Component, OnInit } from '@angular/core';
import { Currency } from '../../models/currency';
import { ExchangeService } from '../../../core/services/exchange.service';
import { forkJoin } from 'rxjs';
import { HistoricalCurrency } from '../../models/historicalCurrency';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  currencyFrom: Currency = {
    code: 'EUR',
    value: 0,
    label: 'Euros',
    symbol: '€',
  };

  currencyTo: Currency = {
    code: 'USD',
    value: 0,
    label: 'Dolares',
    symbol: 'USD$',
  };

  historicalCurrency: HistoricalCurrency[];

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit() {
    const dayToMillisecond = 86400000;
    const actualDay = new Date();
    const pastDay = new Date(actualDay.getTime() - dayToMillisecond);
    const pastPastDay = new Date(actualDay.getTime() - 2 * dayToMillisecond);
    const listCurrencies = ['USD', 'EUR', 'CAD', 'PLN', 'COP', 'GBP', 'JPY', 'MXN'];

    forkJoin([
      this.exchangeService.historicalPrice(actualDay, 'EUR', listCurrencies),
      this.exchangeService.historicalPrice(pastDay, 'EUR', listCurrencies),
      this.exchangeService.historicalPrice(pastPastDay, 'EUR', listCurrencies),
    ]).subscribe(data => (this.historicalCurrency = data));
  }

  convert() {
    this.exchangeService
      .getLatestCurrencyMoney(this.currencyFrom.code, this.currencyTo.code)
      .subscribe(data => {
        this.currencyTo.value =
          data.rates[this.currencyTo.code] * this.currencyFrom.value;
      });
  }
}
