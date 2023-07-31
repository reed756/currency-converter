import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.initGetCurrencyApiResponse();
  }
}
