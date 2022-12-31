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

  initRestApi(): Observable<number> {
    return new Observable(sub => {
      this.ipc.send('init-rest-api');
      this.ipc.on('init-rest-api', (event: Electron.IpcMessageEvent, port: number) => {
        sub.next(port);
      });
      this.ipc.on('init-rest-api-error', (event: Electron.IpcMessageEvent, error: any) => {
        sub.error(error)
      });
    });
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
