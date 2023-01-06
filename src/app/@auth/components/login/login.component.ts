import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {constants} from "../../../../environment/constants";

enum Fields {
  EMAIL = 'email',
  PASSWORD = 'password'
}

interface LoginFormGroup {
  [Fields.EMAIL]: FormControl<string>;
  [Fields.PASSWORD]: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly webAppTitle = constants.webAppTitle;

  form: FormGroup<LoginFormGroup> | null = null;

  fields = Fields;

  hidePassword: boolean = true;

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
  }

  formControlError(fieldName: Fields): ValidationErrors | null | undefined {
    return this.form?.controls[fieldName].errors;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      [Fields.EMAIL]: ['', [Validators.required, Validators.email]],
      [Fields.PASSWORD]: ['', [Validators.required]]
    })
  }

  login(): void {
    if (this.form && this.form.value.email && this.form.value.password) {
      this.authService.login(this.form.value.email, this.form.value.password)
    }
  }

}
