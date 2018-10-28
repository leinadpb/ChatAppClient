import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignalrService } from '../signalr_service/signalr.service';
import { Observable } from 'rxjs';

import { MessageModel } from '../../shared/models/MessageModel'
import { AuthService } from '../auth_service/AuthService';
import { TokenDTO } from '../../shared/models/TokenDTO';

@Injectable()
export class MessagesService {

    // private url: string = 'https://localhost:5001/api/messages';
    private ENDPOINT = "http://127.0.0.1:5000/api/messages";

    constructor(private http: HttpClient, private authService: AuthService) { }

    getMessages(): Observable<any> {
        let token = window.localStorage.getItem(this.authService.TOKEN_COOKIE_KEY);
        console.log(`USER TOKEN IS: >>>>>>>> ${token}`);
        return this.http.get(this.ENDPOINT, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
            withCredentials: true
        });   
    }


    saveMessage(msg: MessageModel, id: string): Observable<any> {
        let token = window.localStorage.getItem(this.authService.TOKEN_COOKIE_KEY);
        console.log(`ID received on messages services: ${id}`);
        console.log(`USER TOKEN IS: >>>>>>>> ${token}`);
        let params = {
            "connId": id
        }
        return this.http.post<MessageModel>(this.ENDPOINT, msg, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
            params: params
        });
    }
}