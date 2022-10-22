import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleNamePipe } from './pipes/role-name.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BooleanTextPipe } from './pipes/boolean-text.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { LogoComponent } from './components/logo/logo.component';
import { BackgroundComponent } from './components/background/background.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { MatSelectModule } from '@angular/material/select';
import { FormatCountryPipe } from './pipes/format-country.pipe';
import { SettingTypeNamePipe } from './pipes/setting-type-name.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    RoleNamePipe,
    ConfirmDialogComponent,
    BooleanTextPipe,
    SafeUrlPipe,
    LogoComponent,
    BackgroundComponent,
    CountrySelectComponent,

    FormatCountryPipe,
    SettingTypeNamePipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FormsModule,
  ],
  exports: [
    RoleNamePipe,
    BooleanTextPipe,
    SafeUrlPipe,
    LogoComponent,
    BackgroundComponent,
    CountrySelectComponent,
    SettingTypeNamePipe,
  ],
})
export class SharedModule {}
