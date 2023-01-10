import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizationsRoutingModule} from './organizations-routing.module';
import {OrganizationsListComponent} from './components/organizations-list/organizations-list.component';
import {OrganizationsComponent} from './organizations.component';
import {OrganizationDetailComponent} from './components/organization-detail/organization-detail.component';
import {OrganizationsService} from "../services";
import {OrganizationsMockService} from "../services/organizations/organizations-mock.service";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {AddressComponent} from "../@commons/components/address/address.component";
import {IbanPipe} from "../@commons/pipes/iban/iban.pipe";


@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationsComponent,
    OrganizationDetailComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    AddressComponent,
    IbanPipe
  ],
  providers: [
    {provide: OrganizationsService, useClass: OrganizationsMockService}
  ]
})
export class OrganizationsModule {
}
