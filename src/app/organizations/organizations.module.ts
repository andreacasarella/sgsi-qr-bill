import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationsRoutingModule} from './organizations-routing.module';
import {OrganizationsListComponent} from './components/organizations-list/organizations-list.component';
import {OrganizationsComponent} from './organizations.component';
import {OrganizationDetailComponent} from './components/organization-detail/organization-detail.component';


@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationsComponent,
    OrganizationDetailComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule
  ]
})
export class OrganizationsModule {
}
