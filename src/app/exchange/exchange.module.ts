import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { LandingComponent } from './page/landing/landing.component';
import { UiModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    UiModule,
    FormsModule,
    NgxCurrencyModule
  ],
})
export class ExchangeModule { }
