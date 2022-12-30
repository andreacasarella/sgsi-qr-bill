import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {AuthUser} from "../types/auth-user";
import {Router} from "@angular/router";
import {Auth, authState, signOut, User} from "@angular/fire/auth";
import {doc, docSnapshots, Firestore} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private userSubject = new BehaviorSubject<User | null>(null)
  public $user = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: Auth,
    private afStore: Firestore
  ) {
    console.log('USER SERVICE CONSTRUCTOR')
    authState(this.afAuth).pipe(
      // take(1),
      // tap(auth => this.userSubject.next(auth)),
      // switchMap(u => this.getUserInfo(u)),
    ).subscribe(userInfo => {
      console.log(userInfo)
      if (!userInfo) {
        this.userSubject.next(null);
        signOut(this.afAuth)
          .then(_ => this.router.navigate(['auth']));
      } else
        this.userSubject.next(userInfo);
    }, () => {
      /* console.log('ERROR');
       this.userSubject.next(null);
       this.afAuth.signOut()
         .then(_ => this.router.navigate(['auth']));
       return of(null);*/
    });
  }

  getUserInfo(auth: User | null): Observable<AuthUser | null> {
    console.log('getUserInfo', auth)
    if (auth) {
      /*const $userInfo = this.afStore.doc<UserInfo>('users/' + auth.uid).valueChanges()
        .pipe(
          take(1),
          switchMap(info => {
            return of({
              auth: auth,
              firstName: info?.firstName,
              lastName: info?.lastName,
              role: info?.role,
              photoURL: this.avatarUrlService.getUrl(info?.lastName, info?.firstName, info?.bgColor),
              bgColor: info?.bgColor
            });
          }),
        );*/
      /* const ref = doc(this.afStore, 'users', auth.uid);
       docSnapshots(ref).subscribe( docData => {console.log(docData.exists())})
       */
      return docSnapshots(doc(this.afStore, 'users', auth.uid)).pipe(
        switchMap((doc) => {
          if (doc.exists()) {
            let data = doc.data() as AuthUser;
            return of({
              auth: auth,
              firstName: data.firstName,
              lastName: data.lastName,
              role: data.role,
              photoURL: data.photoURL,
              bgColor: data.bgColor
            });
          }
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }


}
