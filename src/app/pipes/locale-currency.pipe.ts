import {formatCurrency, getLocaleCurrencySymbol} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'localeCurrency'
})
export class LocaleCurrencyPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private localeId: string) {
  }

  transform(price: number, currencyCode?: string, digitInfo?: string) {
    return formatCurrency(price, this.localeId, getLocaleCurrencySymbol(this.localeId), currencyCode, digitInfo);
  }

}
