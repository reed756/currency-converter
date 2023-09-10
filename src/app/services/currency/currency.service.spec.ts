import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';
import { environment } from '../../../environments/environment';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize currencyApiResponse$', () => {
    const mockResponse = {
      success: true,
      timestamp: 1631203200,
      base: "EUR",
      date: "2022-09-09",
      rates: {
        USD: 1.2,
        AUD: 1.5,
        CAD: 1.3,
        PLN: 4.2,
        MXN: 24.5
      }
    };

    service.initGetCurrencyApiResponse();

    const req = httpMock.expectOne(`http://data.fixer.io/api/latest?access_key=${environment.access_key}&base=EUR&symbols=USD,AUD,CAD,PLN,MXN&format=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    service.getCurrencyApiResponse().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should return currency rates', () => {
    const mockResponse = {
      success: true,
      timestamp: 1631203200,
      base: "EUR",
      date: "2022-09-09",
      rates: {
        USD: 1.2,
        AUD: 1.5,
        CAD: 1.3,
        PLN: 4.2,
        MXN: 24.5
      }
    };
    service.initGetCurrencyApiResponse();
    const expectedRates = [
      { currencyCode: 'USD', rate: 1.2 },
      { currencyCode: 'AUD', rate: 1.5 },
      { currencyCode: 'CAD', rate: 1.3 },
      { currencyCode: 'PLN', rate: 4.2 },
      { currencyCode: 'MXN', rate: 24.5 },
    ];

    const req = httpMock.expectOne(`http://data.fixer.io/api/latest?access_key=${environment.access_key}&base=EUR&symbols=USD,AUD,CAD,PLN,MXN&format=1`);
    req.flush(mockResponse);

    service.getCurrencyRates().subscribe(rates => {
      expect(rates).toEqual(expectedRates);
    });
  });

  it('should return rate by currency code', () => {
    const mockResponse = {
      success: true,
      timestamp: 1631203200,
      base: "EUR",
      date: "2022-09-09",
      rates: {
        USD: 1.2,
        AUD: 1.5,
        CAD: 1.3,
        PLN: 4.2,
        MXN: 24.5
      }
    };
    service.initGetCurrencyApiResponse();

    const req = httpMock.expectOne(`http://data.fixer.io/api/latest?access_key=${environment.access_key}&base=EUR&symbols=USD,AUD,CAD,PLN,MXN&format=1`);
    req.flush(mockResponse);

    service.getRateByCurrencyCode('USD').subscribe(rate => {
      expect(rate).toEqual(1.2);
    });

  });
});
