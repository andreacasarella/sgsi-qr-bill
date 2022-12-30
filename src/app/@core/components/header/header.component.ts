import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {filter} from "rxjs/operators";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AuthService} from "../../../@auth/services/auth.service";
import {AuthUserService} from "../../../@auth/services/auth-user.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {MatDividerModule} from "@angular/material/divider";
import {MessageDialogComponent} from "../../../@commons/components/message-dialog/message-dialog.component";
import {RouterModule} from "@angular/router";
import {UserAvatarComponent} from "../../../@commons/components/user-avatar/user-avatar.component";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, MatSnackBarModule, MatDialogModule, SearchBarComponent, MatDividerModule, UserAvatarComponent],
  providers: [{provide: AuthService, useClass: AuthService}],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | null = null;

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private userService: AuthUserService,
    private dialog: MatDialog
  ) {
  }

  get userDisplayName(): string | null | undefined {
    return this.user?.displayName || this.user?.email;
  }

  ngOnInit(): void {
    this.userService.$user.pipe(
      filter(u => !!u)
    ).subscribe(user => {
      this.user = user
    });
  }

  toggleSidenav() {
    this.toggle.emit();
  }

  logout(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '450px',
      data: {
        titleKey: 'dialogs.logout.title',
        messageKey: 'dialogs.logout.message',
        actionLabelKey: 'actions.logout',
        actionColor: 'warn',
        confirm: true
      }
    });

    dialogRef.afterClosed().pipe(
      filter(confirm => !!confirm)
    ).subscribe(patient => {
      this.authService.logout();
    });
  }
}
