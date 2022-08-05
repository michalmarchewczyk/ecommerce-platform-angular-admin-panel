import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StoreModule } from '@ngrx/store';

import * as fromCatalog from './store/reducers';
import { ProductsComponent } from './pages/products/products.component';
import { EffectsModule } from '@ngrx/effects';
import {
  AttributesEffects,
  CategoriesEffects,
  ProductsEffects,
} from './store/effects';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { ProductPhotoComponent } from './components/product-photo/product-photo.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductPhotoComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    StoreModule.forFeature(fromCatalog.catalogFeatureKey, fromCatalog.reducers),
    EffectsModule.forFeature([
      ProductsEffects,
      CategoriesEffects,
      AttributesEffects,
    ]),
    MatCardModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    MatIconModule,
  ],
})
export class CatalogModule {}
