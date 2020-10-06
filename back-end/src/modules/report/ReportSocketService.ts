import { Emit, Input, IO, Nsp, SocketService } from '@tsed/socketio';
import { Document } from 'mongoose';
import { Namespace, Server } from 'socket.io';
import { Report } from './Report';

@SocketService('/report')
export class ReportSocketService {
  @Nsp nsp: Namespace;

  constructor(@IO private io: Server) {
  }

  public newReport(
    report: Report & Document
  ) {
    this.nsp.emit('new-report', report);
  }

  @Input('auth')
  @Emit('on-auth')
  public onAuth() {
  }
}
