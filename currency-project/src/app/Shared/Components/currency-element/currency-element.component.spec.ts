import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyElementComponent } from './currency-element.component';

describe('CurrencyElementComponent', () => {
  let component: CurrencyElementComponent;
  let fixture: ComponentFixture<CurrencyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
