import {Component, Inject, inject, OnInit} from '@angular/core';
import {AuthService} from "../../@auth/services/auth.service";
import {AuthUserService} from "../../@auth/services/auth-user.service";
import {FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "@angular/fire/auth";
import {SpinnerService} from "../../@commons/services/spinner.service";

enum Fields {
  DISPLAY_NAME = 'displayName'
}

interface EditProfileDisplayNameFormGroup {
  [Fields.DISPLAY_NAME]: FormControl<string>;
}

@Component({
  selector: 'app-edit-profile-display-name-form-dialog',
  templateUrl: './edit-profile-display-name-form-dialog.component.html',
  styleUrls: ['./edit-profile-display-name-form-dialog.component.scss']
})
export class EditProfileDisplayNameFormDialogComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  private spinnerService: SpinnerService = inject(SpinnerService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  userService: AuthUserService = inject(AuthUserService);
  form: FormGroup<EditProfileDisplayNameFormGroup> | null = null;
  fields = Fields;

  constructor(
    public dialogRef: MatDialogRef<EditProfileDisplayNameFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      displayName: string;
    }
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      [Fields.DISPLAY_NAME]: [this.data.displayName || '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(user: User): void {
    if (this.form && this.form.value.displayName) {
      this.authService.updateProfileDisplayName(user, this.form.value.displayName);
      this.dialogRef.close(true);
    }
  }

  formControlErrors(fieldName: Fields): ValidationErrors | null | undefined {
    return this.form?.controls[fieldName].errors;
  }

}
