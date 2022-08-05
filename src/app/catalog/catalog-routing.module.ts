import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  {
    title: 'Products',
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: ':id',
        component: ProductComponent,
      },
      {
        path: '',
        component: ProductsListComponent,
      },
    ],
  },
  {
    title: 'Categories',
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
