import { Component, Input } from '@angular/core';

@Component({
  selector: 'ls-currency-element',
  templateUrl: './currency-element.component.html',
  styleUrl: './currency-element.component.scss',
})
export class CurrencyElementComponent {
  @Input() currency: string = '';
  @Input() amountOfCurrency: string = '';
  @Input() cost: string = '';
}
