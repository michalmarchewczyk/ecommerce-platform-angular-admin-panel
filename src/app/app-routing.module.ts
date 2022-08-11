import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthRoleGuard } from './core/auth/guards/auth-role.guard';
import { User } from './core/api';
import RoleEnum = User.RoleEnum;

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        title: 'Dashboard',
        path: '',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        title: 'Users',
        path: 'users',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin] },
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        title: 'Catalog',
        path: 'catalog',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
        loadChildren: () =>
          import('./catalog/catalog.module').then((m) => m.CatalogModule),
      },
      {
        title: 'Orders',
        path: 'orders',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
    ],
  },
  {
    title: 'Login',
    path: 'login',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
