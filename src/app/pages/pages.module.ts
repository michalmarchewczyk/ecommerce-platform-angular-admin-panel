import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages/pages.component';
import { StoreModule } from '@ngrx/store';
import * as fromPages from './store';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffects } from './store/effects';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    StoreModule.forFeature(fromPages.pagesFeatureKey, fromPages.reducers),
    EffectsModule.forFeature([PagesEffects]),
  ],
})
export class PagesModule {}
