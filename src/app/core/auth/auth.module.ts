import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/reducers';
import { AuthEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoleDirective } from './directives/auth-role.directive';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginFormComponent, LoginComponent, AuthRoleDirective],
  providers: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    AuthRoutingModule,
    SharedModule,
  ],
  exports: [AuthRoleDirective],
})
export class AuthModule {}
