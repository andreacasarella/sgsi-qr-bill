import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthUserService} from "../../services/auth-user.service";
import {filter} from "rxjs/operators";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user: User | null = null;

  constructor(
    private authService: AuthService,
    private userService: AuthUserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.$user.pipe(
      filter(u => !!u)
    ).subscribe(user => {
      this.user = user;
    });
  }

  sendEmailVerification(): void {
    if (this.user && this.user)
      this.authService.sendEmailVerification(this.user);
  }

  backToLogin(): void {
    this.authService.logout();
  }

}
