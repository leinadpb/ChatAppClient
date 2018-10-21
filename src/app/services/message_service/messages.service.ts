import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from '../signalr_service/signalr.service';
import { Observable } from '../../../../node_modules/rxjs';

import { MessageModel } from '../../shared/models/MessageModel'

@Injectable()
export class MessagesService {

    private url: string = 'https://localhost:5001/api/messages';
    private ENDPOINT = "http://127.0.0.1:5000/api/messages";

    constructor(private http: HttpClient, private signalR: SignalrService) { }

    private commonHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    getMessages(): Observable<any> {
        return this.http.get(this.ENDPOINT, {
            headers: this.commonHeaders
        });
    }


    saveMessage(msg: MessageModel): Promise<any> {
        let canContinue: boolean = false;
        let id = '';
        return this.signalR.getConnectionId().then(data => {
            return this.http.post<MessageModel>(this.ENDPOINT + `?connId=${data}`, msg, {
                headers: this.commonHeaders
            });
        }).catch(err => console.log(err));
    }
}