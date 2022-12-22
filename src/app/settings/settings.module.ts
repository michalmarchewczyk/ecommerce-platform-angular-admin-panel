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
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { SettingAddFormComponent } from './components/settting-add-form/setting-add-form.component';
import { MatButtonModule } from '@angular/material/button';
import { ExportComponent } from './components/export/export.component';
import { ImportComponent } from './components/import/import.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsListComponent,
    SettingAddFormComponent,
    ExportComponent,
    ImportComponent,
  ],
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
    MatListModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatProgressBarModule,
  ],
})
export class SettingsModule {}
