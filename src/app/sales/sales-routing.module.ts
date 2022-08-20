import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReturnsComponent } from './pages/returns/returns.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { DeliveryMethodsComponent } from './pages/delivery-methods/delivery-methods.component';
import { AuthRoleGuard } from '../core/auth/guards/auth-role.guard';
import { User } from '../core/api';
import RoleEnum = User.RoleEnum;
import { CreateReturnFormComponent } from './pages/create-return-form/create-return-form.component';
import { ReturnsListComponent } from './pages/returns-list/returns-list.component';
import { CreateOrderFormComponent } from './pages/create-order-form/create-order-form.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { ReturnComponent } from './pages/return/return.component';

const routes: Routes = [
  {
    title: 'Orders',
    path: 'orders',
    canActivate: [AuthRoleGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
    component: OrdersComponent,
    children: [
      {
        title: 'Create new order',
        path: 'new',
        component: CreateOrderFormComponent,
      },
      {
        title: 'Order',
        path: ':id',
        component: OrderComponent,
      },
      {
        title: 'Orders',
        path: '',
        component: OrdersListComponent,
      },
    ],
  },
  {
    title: 'Returns',
    path: 'returns',
    canActivate: [AuthRoleGuard],
    data: { roles: [RoleEnum.Admin, RoleEnum.Manager, RoleEnum.Sales] },
    component: ReturnsComponent,
    children: [
      {
        title: 'Create new return',
        path: 'new',
        component: CreateReturnFormComponent,
      },
      {
        title: 'Return',
        path: ':id',
        component: ReturnComponent,
      },
      {
        title: 'Returns',
        path: '',
        component: ReturnsListComponent,
      },
    ],
  },
  {
    title: 'Payment methods',
    path: 'payment-methods',
    canActivate: [AuthRoleGuard],
    data: { roles: [RoleEnum.Admin] },
    component: PaymentMethodsComponent,
  },
  {
    title: 'Delivery methods',
    path: 'delivery-methods',
    canActivate: [AuthRoleGuard],
    data: { roles: [RoleEnum.Admin] },
    component: DeliveryMethodsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
