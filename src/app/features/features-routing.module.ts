import {RouterModule, Routes} from "@angular/router";
import {AuthGuard, emailVerified} from "@angular/fire/auth-guard";
import {map, pipe} from "rxjs";
import {NgModule} from "@angular/core";
import {FeaturesComponent} from "./features.component";

const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectUnauthorizedToVerifyEmail = () => redirectUnverifiedTo(['auth/verify-email']);

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToVerifyEmail},
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'organizations',
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToVerifyEmail},
        loadChildren: () => import('../organizations/organizations.module').then(m => m.OrganizationsModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToVerifyEmail},
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {
}
