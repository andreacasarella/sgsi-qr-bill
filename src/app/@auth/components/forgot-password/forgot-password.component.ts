import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {constants} from "../../../../environment/constants";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  readonly webAppTitle = constants.webAppTitle;

  form: UntypedFormGroup | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  forgotPassword(): void {
    this.authService.forgotPassword(this.emailControl?.value)
  }

  get emailControl(): AbstractControl | null | undefined {
    return this.form?.get('email');
  }

}
