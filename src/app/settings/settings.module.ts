import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './store';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from './store/effects';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    StoreModule.forFeature(
      fromSettings.settingsFeatureKey,
      fromSettings.reducers,
    ),
    EffectsModule.forFeature([SettingsEffects]),
    MatCardModule,
    MatTabsModule,
    MatIconModule,
  ],
})
export class SettingsModule {}
