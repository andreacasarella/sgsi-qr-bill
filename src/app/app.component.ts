import {Component} from '@angular/core';
import {ElectronService} from "./services";
import {BackendService} from "./services/backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private backendService: BackendService
  ) {
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      this.backendService.initRestApi().subscribe(value => console.log('initRestApi', value), error => console.log(error))
    } else {
      console.log('Run in browser');
    }
  }

}
