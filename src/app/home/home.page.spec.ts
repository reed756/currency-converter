import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { HomePage } from './home.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CurrencyService } from '../services/currency/currency.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service: CurrencyService;
  let loader: LoadingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    service = TestBed.inject(CurrencyService);
    loader = TestBed.inject(LoadingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form when initialized', () => {
    const amountControl = component.currencyForm.get('amount');
    const fromControl = component.currencyForm.get('from');
    const toControl = component.currencyForm.get('to');

    expect(amountControl?.valid).toBeTruthy();
    expect(fromControl?.valid).toBeFalsy();
    expect(toControl?.valid).toBeFalsy();
  });

  it('should validate the amount field as a valid number', () => {
    const amountControl = component.currencyForm.get('amount');
    amountControl?.setValue('123.45');

    expect(amountControl?.valid).toBeTruthy();
  });

  it('should validate the amount field as an invalid number', () => {
    const amountControl = component.currencyForm.get('amount');
    amountControl?.setValue('abc');

    expect(amountControl?.valid).toBeFalsy();
  });

  it('should calculate the result correctly', async () => {
    const mockRate = 1.2;
    const expectedAmount = 24.0;

    spyOn(service, 'getRateByCurrencyCode').and.returnValue(of(mockRate));

    component.currencyForm.setValue({
      amount: 20,
      from: 'EUR',
      to: 'USD'
    });

    await component.generate();

    expect(component.result).toEqual(expectedAmount);
  });

  it('should call currencyService.getRateByCurrencyCode with the correct currency code', async () => {
    const currencyServiceSpy = spyOn(service, 'getRateByCurrencyCode').and.returnValue(of(1.2));

    component.currencyForm.setValue({
      amount: 10,
      from: 'EUR',
      to: 'USD'
    });

    await component.generate();

    expect(currencyServiceSpy).toHaveBeenCalledWith('USD');
  });

});
