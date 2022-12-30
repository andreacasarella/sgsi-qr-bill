import {Component, Inject, inject, OnInit} from '@angular/core';
import {AuthService} from "../../@auth/services/auth.service";
import {AuthUserService} from "../../@auth/services/auth-user.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-edit-profile-display-name-form-dialog',
  templateUrl: './edit-profile-display-name-form-dialog.component.html',
  styleUrls: ['./edit-profile-display-name-form-dialog.component.scss']
})
export class EditProfileDisplayNameFormDialogComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  userService: AuthUserService = inject(AuthUserService);

  fb: FormBuilder = inject(FormBuilder);
  form: FormGroup | null = null;

  get displayNameControl(): AbstractControl | null | undefined {
    return this.form?.get('displayName');
  }

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
      displayName: [this.data.displayName || '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(user: User): void {
    if (this.form) {
      this.authService.updateProfileDisplayName(user, this.form.get('displayName')?.value);
      this.dialogRef.close(true);
    }
  }
}
