import {Component, OnInit} from '@angular/core';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {constants} from "../../../../environment/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly webAppTitle = constants.webAppTitle;

  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {
  }

  get emailControl(): AbstractControl | null {
    return this.form?.get('email');
  }

  get passwordControl(): AbstractControl | null {
    return this.form?.get('password');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login(): void {
    this.authService
      .login(this.emailControl?.value, this.passwordControl?.value)
  }

}
