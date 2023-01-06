import {Component, inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "@angular/fire/auth";
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {Dimensions, ImageCroppedEvent, ImageTransform} from "ngx-image-cropper";
import {AuthService} from "../../@auth/services/auth.service";
import {AuthUserService} from "../../@auth/services/auth-user.service";
import {getDownloadURL, ref, Storage, uploadString} from "@angular/fire/storage";
import {debounceTime, shareReplay, tap} from "rxjs";
import {SpinnerService} from "../../@commons/services/spinner.service";

enum Fields {
  ZOOM = 'zoom',
  PHOTO_URL = 'photoURL'
}

interface EditProfilePhotoFormGroup {
  [Fields.ZOOM]: FormControl<number>;
  [Fields.PHOTO_URL]: FormControl<string>;
}

@Component({
  selector: 'app-edit-profile-photo-form-dialog',
  templateUrl: './edit-profile-photo-form-dialog.component.html',
  styleUrls: ['./edit-profile-photo-form-dialog.component.scss']
})
export class EditProfilePhotoFormDialogComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  userService: AuthUserService = inject(AuthUserService);

  private storage: Storage = inject(Storage);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private spinnerService: SpinnerService = inject(SpinnerService);

  form: FormGroup<EditProfilePhotoFormGroup> | null = null;
  fields = Fields;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  currentScale = 1;
  max = 1.9;
  min = 0.1
  step = 0.1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  constructor(
    public dialogRef: MatDialogRef<EditProfilePhotoFormDialogComponent>
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.form = this.fb.group({
      [Fields.ZOOM]: [1],
      [Fields.PHOTO_URL]: ['', [Validators.required]]
    });

    this.form.controls['zoom']?.valueChanges.pipe(
      debounceTime(200),
      tap((next) => {
        this.setScale(next);
      }),
      shareReplay(1)
    ).subscribe();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(user: User): void {
    if (this.form && this.form.value.photoURL) {
      const photoURLRef = ref(this.storage, 'users/' + user.uid);
      this.spinnerService.show('Upload immagine profilo in corso...');
      uploadString(photoURLRef, this.form.value.photoURL, 'data_url').then(
        (result) => {
          console.log(result);
          getDownloadURL(photoURLRef).then(
            (photoURL) => {
              this.spinnerService.hide();
              this.authService.updateProfilePhotoURL(user, photoURL);
              this.dialogRef.close(true);
            }
          );
        }
      )
    }
  }

  fileChangeEvent(event: any): void {
    // console.log(event)
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImage = event.base64;
      this.form?.patchValue({
        [Fields.PHOTO_URL]: event.base64
      });
      // console.log(event, base64ToFile(event.base64));
    }
  }

  imageLoaded() {
    this.showCropper = true;
    // console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    // console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
    this.form?.reset();
  }

  setScale(value: number): void {
    this.currentScale = value;
    this.transform = {
      ...this.transform,
      scale: this.currentScale
    };
  }

  zoomOut() {
    if (this.form && this.form.value.zoom)
      this.form.patchValue({
        [Fields.ZOOM]: this.form.value.zoom - this.step
      });
  }

  zoomIn() {
    if (this.form && this.form.value.zoom)
      this.form.patchValue({
        [Fields.ZOOM]: this.form.value.zoom + this.step
      });
  }

}
