import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ROOT_URL } from '../../root-url';

@Injectable({
  providedIn: 'root'
})
export class ReportSocketService {
  public reportSocket: SocketIOClient.Socket;

  constructor() {
    this.reportSocket = io(`${ROOT_URL}/report`);
  }

  emit(
    event: string,
    ...data
  ) {
    this.reportSocket.emit(event, ...data);
  }

  on(event: string) {
    return new Observable(observer => {
      this.reportSocket.on(event, data => {
        observer.next(data);
      });
    });
  }

  once(event: string) {
    return new Observable(observer => {
      this.reportSocket.once(event, data => {
        observer.next(data);
      });
    });
  }
}
