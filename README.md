# SgsiQrBill

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## TODO

- [ ] Mockup
  - [ ] Dashboard
  - [ ] Organization
    - [ ] Wizard
- [ ] Angular deps
  - [X] Material
  - [X] Bootstrap
  - [X] Luxon
  - [ ] Google phone lib
- [ ] I18n
  - [X] ngx-translate
  - [ ] it, de, fr, en
- [ ] Firebase
  - [X] Setup
  - [X] Auth
    -  [X] Login
    -  [X] Reset password
    -  [X] Confirm email
  - [ ] Storage
    - [X] Profile image
    - [ ] DB
- [ ] Electron
  - [ ] Setup
  - [ ] Release
  - [ ] Handle ipc messages
- [ ] sqlite3
  - [ ] Init db and tables
  - [ ] Export
  - [ ] Import
- [ ] Swiss qr bill generator
  - [ ] Preview
  - [ ] Generate
- [ ] Organization
  - [ ] Add logo
  - [ ] CRUD operations
- [ ] Clients
  - [ ] Import
  - [ ] Export
  - [ ] CRUD operations
- [ ] Invoices
  - [ ] Compose
  - [ ] Preview
  - [ ] Send by email
  - [ ] Print
- [X] Profile
  - [X] Edit displayName
  - [X] Edit photoURL
  - [X] ngx-image-cropper

## Web Development server

Run `npm run ng:serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload
if you
change any of the source files.

## Electron Development with live reload

Run `npm run start` for a dev electron app. App also available as ng:serve but no access to electron features.

## Firebase integration

### Configurations

Create a file firebase.ts with firebase configuration generate by creating a new project in src/environment folder.

    export const firebaseConfig = {
      apiKey: <YOUR_API_KEY>,
      authDomain: "<YOUR_AUTH_DOMAIN>,
      projectId: <YOUR_PROJECT_ID>,
      storageBucket: <YOUR_STORAGE_BUCKET>,
      messagingSenderId: <YOUR_MESSAGING_SENDER_ID>,
      appId: <YOUR_APP_ID>
    };

### Authentication

- Enable Email/password provider in Project > Authentication > Sign-in method;
- Add a user with email and password;
- Logged user must validate email.

### Storage rules

    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
      
          function signedIn() {
            return request.auth.uid != null
          }
          
          match /users/{document=**} {
            allow read, write: if signedIn() && request.auth.token.email_verified;
          }  
      
      }
    }

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
