import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationsListComponent} from "./components/organizations-list/organizations-list.component";
import {OrganizationsComponent} from "./organizations.component";
import {OrganizationDetailComponent} from "./components/organization-detail/organization-detail.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    children: [
      {
        path: '',
        component: OrganizationsListComponent
      },
      {
        path: ':id',
        component: OrganizationDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {
}
