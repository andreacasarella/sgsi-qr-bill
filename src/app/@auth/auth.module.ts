import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {MatDividerModule} from "@angular/material/divider";
import {TranslateModule} from "@ngx-translate/core";
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {ErrorsPhrasePipe} from "../@commons/pipes/error-phrase/errors-phrase.pipe";
import {AuthService} from "./services/auth.service";


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDividerModule,
    ErrorsPhrasePipe
  ],
  providers: [
    {provide: AuthService, useClass: AuthService}
  ]
})
export class AuthModule {
}
