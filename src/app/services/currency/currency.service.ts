import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import CurrencyApiResponse from 'src/app/models/currency-api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {}

  private currencyApiResponse$ = new BehaviorSubject<CurrencyApiResponse>({
    success: false,
    timestamp: 0,
    base: "",
    date: "",
    rates: {
      USD: 0,
      AUD: 0,
      CAD: 0,
      PLN: 0,
      MXN: 0
    }
  });


  public initGetCurrencyApiResponse() {
    this.http.get(`https://data.fixer.io/api/latest?access_key=${environment.access_key}&base=EUR&symbols=USD,AUD,CAD,PLN,MXN&format=1`).subscribe(res => {
      this.currencyApiResponse$.next(res as CurrencyApiResponse);
    });
  }

  public getCurrencyApiResponse(): Observable<CurrencyApiResponse> {
    return this.currencyApiResponse$.asObservable();
  }

  public getCurrencyRates(): Observable<any[]> {
    return this.currencyApiResponse$.pipe(
      map((response: CurrencyApiResponse) => {
        // Extract the rates object from the API response and convert it into an array of objects
        return Object.keys(response.rates).map((currencyCode: string) => ({
          currencyCode,
          rate: response.rates[currencyCode]
        }));
      })
    );
  }

  public getRateByCurrencyCode(currencyCode: string): Observable<number | undefined> {
    return this.getCurrencyRates().pipe(
      map((rates: any[]) => {
        const currencyData = rates.find((item: any) => item.currencyCode === currencyCode);
        return currencyData ? currencyData.rate : undefined;
      })
    );
  }

}
