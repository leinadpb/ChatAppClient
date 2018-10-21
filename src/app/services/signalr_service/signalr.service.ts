import { Injectable, Input } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject }    from 'rxjs';

@Injectable()
export class SignalrService {

    private notify = new Subject<any>();
    private messages = new Subject<any>();
    /**
     * Observable string streams
    */
    notifyObservable$ = this.notify.asObservable();
    messagesObservable$ = this.messages.asObservable();

    private ENDPOINT = "http://localhost:5000/chat";
    private _hubConnection: HubConnection;

    public usersCount: number = 0;

    notifyOther(data: any) {
      if (data) {
        this.notify.next(data);
      }
    }

    anotherMessage(data: any) {
      if (data) {
        this.messages.next(data);
      }
    }

    startPipeline(): void {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    private startConnection(): void {
        this._hubConnection
          .start().then(data => {
            console.log('Hub connection started!!!!!!!!');
            this.usersCount = 1;
        }).catch(error => {
          console.log(`ChatApp: Error on connecting to hub: ${error}`);
        })
      }
    
      private createConnection(): void {
        this._hubConnection = new HubConnectionBuilder()
          .withUrl(this.ENDPOINT)
          .build();
      }
    
      private registerOnServerEvents(): void {
        this._hubConnection.on('changeTotalMessages', (data: number) => {
          console.log(`Connected users: ${data}`);
          this.usersCount = data;
          this.notifyOther(data);
        });
        this._hubConnection.on('ReceiveMessage', (data: any) => {
          //console.log(`Recaived messaged: ${data.authorName} : ${data.text}`);
          console.log(data);
          this.anotherMessage(data);
        });
      }
}