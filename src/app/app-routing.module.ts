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
        title: 'Settings',
        path: 'settings',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin] },
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        title: 'Pages',
        path: 'pages',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin] },
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
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
        title: 'Sales',
        path: 'sales',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
        loadChildren: () =>
          import('./sales/sales.module').then((m) => m.SalesModule),
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
