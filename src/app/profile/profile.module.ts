import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {UserAvatarComponent} from "../@commons/components/user-avatar/user-avatar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../@auth/services/auth.service";
import {ImageCropperModule} from "ngx-image-cropper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  EditProfilePhotoFormDialogComponent
} from './edit-profile-photo-form-dialog/edit-profile-photo-form-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatIconModule} from "@angular/material/icon";
import {
  EditProfileDisplayNameFormDialogComponent
} from './edit-profile-display-name-form-dialog/edit-profile-display-name-form-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ErrorsPhrasePipe} from "../@commons/pipes/error-phrase/errors-phrase.pipe";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    ProfileComponent,
    EditProfilePhotoFormDialogComponent,
    EditProfileDisplayNameFormDialogComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UserAvatarComponent,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    ImageCropperModule,
    FormsModule,
    MatDialogModule,
    TranslateModule,
    MatSliderModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorsPhrasePipe,
    MatDividerModule
  ],
  providers: [
    {provide: AuthService, useClass: AuthService}
  ]
})
export class ProfileModule {
}
