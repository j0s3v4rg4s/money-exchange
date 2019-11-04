import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { UiModule } from '../../../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LatestConvert } from '../../models/latestConvert';

const mockExchangeRespond: LatestConvert = {
  success: true,
  timestamp: 1572897846,
  base: 'EUR',
  date: '2019-11-04',
  rates: { USD: 1.11265 },
};

const mockHttpClient = jasmine.createSpyObj('httpClient', {
  get: of(mockExchangeRespond),
});

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiModule,
        FormsModule,
        NgxCurrencyModule,
        BrowserAnimationsModule,
      ],
      declarations: [LandingComponent],
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert EUR 15.23 to USD 22.253', done => {
    component.currencyFrom.value = 20.0;
    component.convert();
    setTimeout(() => {
      expect(component.currencyTo.value).toEqual(22.253);
      done();
    }, 1000);
  });
});
