import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User
} from "@angular/fire/auth";
import {constants} from "../../../environment/constants";
import {I18nService} from "../../@core/i18n/i18n.service";
import {SpinnerService} from "../../@commons/services/spinner.service";

@Injectable()
export class AuthService {

  constructor(
    private afAuth: Auth,
    private router: Router,
    private snackBar: MatSnackBar,
    private i18n: I18nService,
    private spinnerService: SpinnerService
  ) {
  }

  login(email: string, password: string): void {
    this.spinnerService.show('Autenticazione in corso...');
    signInWithEmailAndPassword(this.afAuth, email, password)
      .then(_ => {
        this.spinnerService.hide();
        this.router.navigate([''])
      })
      .catch(err => {
        this.spinnerService.hide();
        this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig);
      });
  }

  googleAuth(): void {
    signInWithPopup(this.afAuth, new GoogleAuthProvider())
      .then(_ => this.router.navigate(['']))
      .catch(err => {
        this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig);
      });
  }

  logout(): void {
    this.afAuth.signOut()
      .then(_ => {
        localStorage.removeItem('sk');
        this.router.navigate(['auth'])
      });
  }

  signup(email: string, password: string): void {
    createUserWithEmailAndPassword(this.afAuth, email, password)
      .then(res => this.sendEmailVerification(res.user))
      .catch(err => {
        this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig);
      })
  }

  forgotPassword(email: string): void {
    sendPasswordResetEmail(this.afAuth, email)
      .then(_ => {
        this.snackBar.open('Email di recupero password inviata', undefined, {duration: 2000});
        return this.router.navigate(['auth']);
      })
      .catch(err => {
        this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig);
      })
  }

  sendEmailVerification(user: User): void {
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(_ => {
          this.snackBar.open('Email di verifica inviata', undefined, {duration: 2000});
          return this.router.navigate(['auth/verify-email']);
        })
        .catch(err => {
          this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig);
        });
    } else {
      this.snackBar.open('Errore durante l\'invio', undefined, <MatSnackBarConfig>constants.snackBarErrorConfig);
    }
  }

  /*updateProfile(user: User, data: {displayName: string | null, photoUrl: string | null}): void{
    updateProfile(user, {displayName: data.displayName, photoURL: data.photoUrl})
      .then( () => this.snackBar.open('Profilo aggiornato', undefined, {duration: 2000}))
      .catch( err => this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig ))
  }
*/
  updateProfilePhotoURL(user: User, photoURL: string | null): void {
    updateProfile(user, {photoURL: photoURL})
      .then(() => this.snackBar.open('Profilo aggiornato', undefined, {duration: 2000}))
      .catch(err => this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig))
  }

  updateProfileDisplayName(user: User, displayName: string | null): void {
    updateProfile(user, {displayName: displayName})
      .then(() => this.snackBar.open('Profilo aggiornato', undefined, {duration: 2000}))
      .catch(err => this.snackBar.open(this.i18n.translate(`${constants.firebaseErrorKeyPrefix}${err.code}`), undefined, <MatSnackBarConfig>constants.snackBarErrorConfig))
  }

}
