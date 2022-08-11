import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductComponent } from './pages/product/product.component';
import { AuthRoleGuard } from '../core/auth/guards/auth-role.guard';
import { PickTypeClass } from '../core/api';
import RoleEnum = PickTypeClass.RoleEnum;

const routes: Routes = [
  {
    title: 'Products',
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        title: 'Product',
        path: ':id',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager] },
        component: ProductComponent,
      },
      {
        title: 'Products',
        path: '',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
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
