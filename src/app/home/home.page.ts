import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../services/currency/currency.service';
import { LoadingController } from '@ionic/angular';
import { numberValidator } from '../shared/number.directive';
import CurrencyApiResponse from '../models/currency-api-response.model';
import { Observable } from 'rxjs';
import {
  Engine,
  Container,
} from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1500ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class HomePage {
  id = "tsparticles";

  particlesUrl = '../../assets/background.json';

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

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }
}
