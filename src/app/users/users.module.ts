import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './store/reducers';
import { UsersEffects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAddFormComponent } from './components/user-add-form/user-add-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserDetailComponent,
    UserAddFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducers),
    EffectsModule.forFeature([UsersEffects]),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    SharedModule,
    MatSortModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
})
export class UsersModule {}
