import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRatesPageComponent } from './currency-rates-page.component';

describe('CurrencyRatesPageComponent', () => {
  let component: CurrencyRatesPageComponent;
  let fixture: ComponentFixture<CurrencyRatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyRatesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyRatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
