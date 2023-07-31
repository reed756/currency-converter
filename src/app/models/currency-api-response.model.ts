interface CurrencyApiResponse {
  "success": boolean,
  "timestamp": number,
  "base": string,
  "date": string,
  rates: { [currencyCode: string]: number };
}

export default CurrencyApiResponse;
