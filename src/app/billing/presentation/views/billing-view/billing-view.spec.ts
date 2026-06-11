import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingView } from './billing-view';

describe('BillingView', () => {
  let component: BillingView;
  let fixture: ComponentFixture<BillingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingView],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
