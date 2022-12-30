import {Component, inject} from '@angular/core';
import {AuthService} from "../@auth/services/auth.service";
import {AuthUserService} from "../@auth/services/auth-user.service";
import {User} from "@angular/fire/auth";
import {MatDialog} from "@angular/material/dialog";
import {
  EditProfilePhotoFormDialogComponent
} from "./edit-profile-photo-form-dialog/edit-profile-photo-form-dialog.component";
import {ref, Storage} from "@angular/fire/storage";
import {deleteObject} from "@firebase/storage";
import {
  EditProfileDisplayNameFormDialogComponent
} from "./edit-profile-display-name-form-dialog/edit-profile-display-name-form-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private authService: AuthService = inject(AuthService);
  userService: AuthUserService = inject(AuthUserService);
  storage: Storage = inject(Storage);
  private dialog: MatDialog = inject(MatDialog);

  constructor() {
  }


  editProfileDisplayName(user: User): void {
    this.dialog.open(EditProfileDisplayNameFormDialogComponent, {
      width: '450px',
      data: {
        displayName: user.displayName
      }
    }).afterClosed().pipe().subscribe();
  }

  editProfilePhoto(): void {
    this.dialog.open(EditProfilePhotoFormDialogComponent, {
      width: '450px'
    }).afterClosed().pipe().subscribe();
  }

  deleteProfilePhoto(user: User): void {
    const photoURLRef = ref(this.storage, 'users/' + user.uid);
    deleteObject(photoURLRef)
      .then(result => this.authService.updateProfilePhotoURL(user, ''))
      .catch();
  }
}
