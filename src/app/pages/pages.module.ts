import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages/pages.component';
import { StoreModule } from '@ngrx/store';
import * as fromPages from './store';
import { EffectsModule } from '@ngrx/effects';
import { PagesEffects } from './store/effects';
import { PagesListComponent } from './pages/pages-list/pages-list.component';
import { CreatePageFormComponent } from './pages/create-page-form/create-page-form.component';
import { PageComponent } from './pages/page/page.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownModule } from 'ngx-markdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    PagesComponent,
    PagesListComponent,
    CreatePageFormComponent,
    PageComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    StoreModule.forFeature(fromPages.pagesFeatureKey, fromPages.reducers),
    EffectsModule.forFeature([PagesEffects]),
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MarkdownModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
})
export class PagesModule {}
