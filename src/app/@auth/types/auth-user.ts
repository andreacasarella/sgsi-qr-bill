import {SafeUrl} from "@angular/platform-browser";
import {User} from "@angular/fire/auth";

export interface UserInfo {
  lastName?: string | undefined;
  firstName?: string | undefined;
  birthDate?: string | undefined;
  role: string | undefined;
  bgColor?: string | undefined;
}

export interface AuthUser extends UserInfo {
  id?: string;
  auth: User | undefined;
  photoURL?: SafeUrl | undefined;
}

