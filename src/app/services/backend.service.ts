import {Injectable} from '@angular/core';
import {IpcService} from './ipc.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private ipc: IpcService
  ) {
  }

  ready(): Observable<boolean> {
    return new Observable(sub => {
      this.ipc.send('ready');
      this.ipc.on('ready', (event: Electron.IpcMessageEvent) => {
        sub.next(true);
      });
    });
  }
}
