import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "@angular/fire/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform} from "ngx-image-cropper";
import {AuthService} from "../../@auth/services/auth.service";
import {AuthUserService} from "../../@auth/services/auth-user.service";
import {getDownloadURL, ref, Storage, uploadString} from "@angular/fire/storage";
import {tap} from "rxjs";

@Component({
  selector: 'app-edit-profile-photo-form-dialog',
  templateUrl: './edit-profile-photo-form-dialog.component.html',
  styleUrls: ['./edit-profile-photo-form-dialog.component.scss']
})
export class EditProfilePhotoFormDialogComponent implements OnInit {

  @ViewChild('file', {static: true}) file!: ElementRef;

  private authService: AuthService = inject(AuthService);
  userService: AuthUserService = inject(AuthUserService);

  storage: Storage = inject(Storage);
  fb: FormBuilder = inject(FormBuilder);

  form: FormGroup | null = null;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  currentScale = 1;
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
      zoom: [1],
      photoURL: ['', [Validators.required]]
    });

    this.form.get('zoom')?.valueChanges.pipe(
      tap((next) => {
        this.setScale(next);
      })
    ).subscribe();

    // this.form?.get('zoom')?.setValue(0);
  }

  /*ngAfterViewInit(): void {
    this.selectFile();
  }*/

  selectFile(): void {
    this.file.nativeElement.click();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(user: User): void {
    if (this.form) {
      const photoURLRef = ref(this.storage, 'users/' + user.uid);
      uploadString(photoURLRef, this.form.get('photoURL')?.value, 'data_url').then(
        (result) => {
          console.log(result);
          getDownloadURL(photoURLRef).then(
            (photoURL) => {
              this.authService.updateProfilePhotoURL(user, photoURL);
              this.dialogRef.close(true);
            }
          );
        }
      )
    }
  }

  fileChangeEvent(event: any): void {
    console.log(event)
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImage = event.base64;
      this.form?.get('photoURL')?.setValue(event.base64);
      console.log(event, base64ToFile(event.base64));
    }
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
    this.dialogRef.close();
  }

  setScale(value: number): void {
    this.currentScale = value;
    this.transform = {
      ...this.transform,
      scale: this.currentScale
    };
  }

  zoomOut() {
    this.form?.get('zoom')?.setValue(this.form?.get('zoom')?.value - this.step)
    /*this.currentScale -= this.form?.get('zoom')?.value / 10;
    this.transform = {
      ...this.transform,
      scale: this.currentScale
    };*/
  }

  zoomIn() {
    this.form?.get('zoom')?.setValue(this.form?.get('zoom')?.value + this.step)
    /*this.currentScale += this.form?.get('zoom')?.value / 10;
    this.transform = {
      ...this.transform,
      scale: this.currentScale
    };*/
  }

}
