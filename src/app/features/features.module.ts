import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeaturesRoutingModule} from "./features-routing.module";
import {RouterModule} from "@angular/router";
import {FeaturesComponent} from './features.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {HeaderComponent} from "../@core/components/header/header.component";
import {FooterComponent} from "../@core/components/footer/footer.component";
import {NavigationComponent} from "../@core/components/navigation/navigation.component";


@NgModule({
  declarations: [
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeaturesRoutingModule,
    MatSidenavModule,
    HeaderComponent,
    FooterComponent,
    NavigationComponent
  ]
})
export class FeaturesModule {
}
