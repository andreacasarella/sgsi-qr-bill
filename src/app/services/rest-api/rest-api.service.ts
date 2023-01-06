import {inject, Injectable} from '@angular/core';
import {IpcService} from "../ipc.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private ipc: IpcService = inject(IpcService);

  private portSubject = new BehaviorSubject<number | null>(null)
  public $port = this.portSubject.asObservable();


  init(): void {
    console.log('RestApiService init')
    this.ipc.send('init-rest-api');
    this.ipc.on('init-rest-api', (event: Electron.IpcMessageEvent, port: number) => {
      console.log('RestApiService on init-rest-api', port)
      this.portSubject.next(port);
    });
    this.ipc.on('init-rest-api-error', (event: Electron.IpcMessageEvent, error: any) => {
      this.portSubject.next(null);

    });
  }
}
