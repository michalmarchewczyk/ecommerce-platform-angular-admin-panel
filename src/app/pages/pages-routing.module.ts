import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoleGuard } from '../core/auth/guards/auth-role.guard';
import { User } from '../core/api';
import RoleEnum = User.RoleEnum;
import { PagesComponent } from './pages/pages/pages.component';
import { PagesListComponent } from './pages/pages-list/pages-list.component';
import { PageComponent } from './pages/page/page.component';
import { CreatePageFormComponent } from './pages/create-page-form/create-page-form.component';

const routes: Routes = [
  {
    title: 'Pages',
    path: '',
    canActivate: [AuthRoleGuard],
    data: { roles: [RoleEnum.Admin] },
    component: PagesComponent,
    children: [
      {
        title: 'Create new page',
        path: 'new',
        component: CreatePageFormComponent,
      },
      {
        title: 'Page',
        path: ':id',
        component: PageComponent,
      },
      {
        title: 'Pages',
        path: '',
        component: PagesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
