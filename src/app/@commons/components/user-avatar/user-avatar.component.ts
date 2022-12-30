import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent {

  @Input() user: User | null = null;

  getUserInitials(): string | null | undefined {
    let displayName = this.user?.displayName || this.user?.email;
    if (!!displayName)
      return displayName.match(/(^\S\S?|\s\S)?/g)?.map(v => v.trim())?.join("")?.match(/(^\S|\S$)?/g)?.join("")?.toLocaleUpperCase();
    return null;
  }

}
