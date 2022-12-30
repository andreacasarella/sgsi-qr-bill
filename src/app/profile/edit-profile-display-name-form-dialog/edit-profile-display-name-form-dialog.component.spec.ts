import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditProfileDisplayNameFormDialogComponent} from './edit-profile-display-name-form-dialog.component';

describe('EditProfileDisplayNameFormDialogComponent', () => {
  let component: EditProfileDisplayNameFormDialogComponent;
  let fixture: ComponentFixture<EditProfileDisplayNameFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileDisplayNameFormDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditProfileDisplayNameFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
