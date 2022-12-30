import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditProfilePhotoFormDialogComponent} from './edit-profile-photo-form-dialog.component';

describe('EditProfilePhotoFormDialogComponent', () => {
  let component: EditProfilePhotoFormDialogComponent;
  let fixture: ComponentFixture<EditProfilePhotoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfilePhotoFormDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditProfilePhotoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
