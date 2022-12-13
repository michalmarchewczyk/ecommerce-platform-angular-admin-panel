import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoleGuard } from '../core/auth/guards/auth-role.guard';
import { User } from '../core/api';
import RoleEnum = User.RoleEnum;
import { PagesComponent } from './pages/pages/pages.component';

const routes: Routes = [
  {
    title: 'Pages',
    path: '',
    canActivate: [AuthRoleGuard],
    data: { roles: [RoleEnum.Admin] },
    component: PagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
