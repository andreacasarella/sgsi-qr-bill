import {Component} from '@angular/core';
import {ElectronService} from "./services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sgsi-qr-bill';

  constructor(
    // private backend: BackendService,
    private electronService: ElectronService,
  ) {

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }

    /*const backendReady$ = this.backend.ready().pipe(
      filter(p => !!p),
      tap( () => alert('ready')),
      shareReplay(1)
    );

    backendReady$.subscribe();*/
  }

}
