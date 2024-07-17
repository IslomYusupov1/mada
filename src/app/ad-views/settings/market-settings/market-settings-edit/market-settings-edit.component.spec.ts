import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSettingsEditComponent } from './market-settings-edit.component';

describe('MarketSettingsEditComponent', () => {
  let component: MarketSettingsEditComponent;
  let fixture: ComponentFixture<MarketSettingsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketSettingsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
