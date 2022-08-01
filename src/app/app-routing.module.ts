import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoleGuard } from './core/auth/guards/auth-role.guard';
import { User } from './core/api';
import RoleEnum = User.RoleEnum;
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';

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
        component: MainComponent,
      },
      {
        title: 'Users',
        path: 'users',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin] },
        component: UsersComponent,
      },
      {
        title: 'Products',
        path: 'products',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager] },
        component: ProductsComponent,
      },
      {
        title: 'Orders',
        path: 'orders',
        canActivate: [AuthRoleGuard],
        data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
        component: OrdersComponent,
      },
    ],
  },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
