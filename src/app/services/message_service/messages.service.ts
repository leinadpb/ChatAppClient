import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignalrService } from '../signalr_service/signalr.service';
import { Observable } from 'rxjs';

import { MessageModel } from '../../shared/models/MessageModel'
import { AuthService } from '../auth_service/AuthService';

@Injectable()
export class MessagesService {

    private url: string = 'https://localhost:5001/api/messages';
    private ENDPOINT = "http://127.0.0.1:5000/api/messages";

    constructor(private http: HttpClient, private authService: AuthService) { }

    getMessages(): Observable<any> {
        //let token = this.authService.getUserToken();
        let token = localStorage.getItem('token');
        console.log(`USER TOKEN IS: >>>>>>>> ${token}`);
        return this.http.get(this.ENDPOINT, {
            headers: new HttpHeaders({
                'Authorization': token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        });
    }


    saveMessage(msg: MessageModel, id: string): Observable<any> {
        console.log(`ID received on messages services: ${id}`);
        let token = this.authService.getUserToken();
        let params = {
            "connId": id
        }
        return this.http.post<MessageModel>(this.ENDPOINT, msg, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" : 'Bearer ' + token
            },
            params: params
        });
    }
}