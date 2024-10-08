import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePageComponent } from './archive-page.component';

describe('ArchivePageComponent', () => {
  let component: ArchivePageComponent;
  let fixture: ComponentFixture<ArchivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
