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
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../shared/shared.module';
import { ProductPhotoComponent } from './components/product-photo/product-photo.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductPhotosInputComponent } from './components/product-photos-input/product-photos-input.component';
import { ProductComponent } from './pages/product/product.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductAttributesComponent } from './components/product-attributes/product-attributes.component';
import { MatDividerModule } from '@angular/material/divider';
import { AttributeTypeCreateDialogComponent } from './components/attribute-type-create-dialog/attribute-type-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ProductAttributesAddFormComponent } from './components/product-attributes-add-form/product-attributes-add-form.component';
import { ProductAttributeItemComponent } from './components/product-attribute-item/product-attribute-item.component';
import { CreateProductFormComponent } from './pages/create-product-form/create-product-form.component';
import { NewProductPhotosInputComponent } from './components/new-product-photos-input/new-product-photos-input.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    ProductsListComponent,
    ProductPhotoComponent,
    ProductDetailsComponent,
    ProductPhotosInputComponent,
    ProductComponent,
    ProductAttributesComponent,
    AttributeTypeCreateDialogComponent,
    ProductAttributesAddFormComponent,
    ProductAttributeItemComponent,
    CreateProductFormComponent,
    NewProductPhotosInputComponent,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    MatListModule,
  ],
})
export class CatalogModule {}
