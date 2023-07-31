import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../services/currency/currency.service';
import { LoadingController } from '@ionic/angular';
import { numberValidator } from '../shared/number.directive';
import CurrencyApiResponse from '../models/currency-api-response.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  currencyForm: FormGroup;

  public currencyApiResponse$: Observable<CurrencyApiResponse> = this.currencyService.getCurrencyApiResponse();

  public currencyRates$: Observable<any[]> = this.currencyService.getCurrencyRates();

  result!: number;

  constructor(private fb: FormBuilder, private currencyService: CurrencyService, private loadingCtrl: LoadingController) {
    this.currencyForm = this.fb.group({
      amount: [0, [Validators.required, numberValidator(/^(?!0\d)\d+(\.\d+)?$/)]],
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  async generate() {
    const loading = await this.loadingCtrl.create({
      message: 'Generating...'
    });
    await loading.present();
    this.currencyService.getRateByCurrencyCode(this.currencyForm.value.to).subscribe((res: any) => {
      loading.dismiss();
      this.result = this.currencyForm.value.amount * res;
    })
  }
}
