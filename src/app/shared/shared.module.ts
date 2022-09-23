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

@NgModule({
  declarations: [
    RoleNamePipe,
    ConfirmDialogComponent,
    BooleanTextPipe,
    SafeUrlPipe,
    LogoComponent,
    BackgroundComponent,
  ],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [
    RoleNamePipe,
    BooleanTextPipe,
    SafeUrlPipe,
    LogoComponent,
    BackgroundComponent,
  ],
})
export class SharedModule {}
