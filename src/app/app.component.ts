import {Component} from '@angular/core';
import {ElectronService, OrganizationsService} from "./services";
import {RestApiService} from "./services/rest-api/rest-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private backendService: RestApiService,
    private organizationsService: OrganizationsService
  ) {
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      this.backendService.init();
      this.organizationsService.index().subscribe((next) => alert(next));
    } else {
      console.log('Run in browser');
    }
  }

}
