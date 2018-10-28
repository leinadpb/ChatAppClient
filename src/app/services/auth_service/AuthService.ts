import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

import { UserApp } from '../../shared/models/UserApp';
import { TokenDTO } from '../../shared/models/TokenDTO';
import { UserLoginDTO } from '../../shared/models/UserLoginDTO';
import { AppUserAuth } from '../../shared/models/AppUserAuth';

@Injectable()
export class AuthService {

    private ENDPOINT: string = 'http://127.0.0.1:5000/api/account';
    public TOKEN_COOKIE_KEY = 'bearerToken';
    public USERNAME_COOKIE_KEY = 'emailCurrentUser'
    public SECURITY_OBJ_COOKIE_KEY = 'securityObjectCookieKey';
    securityObject: AppUserAuth = new AppUserAuth();
    private loginStream = new Subject<any>();

    //Observables
    login$ = this.loginStream.asObservable();

    constructor(private http: HttpClient) { }

    notifySecurityObject(user: AppUserAuth): void {
        this.loginStream.next(user);
    }

    login(entity: UserApp): void {
        this.resetSecurityObject(); // Initialize Security Object
        this.http.post(this.ENDPOINT + '/login', entity, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).subscribe(data => {
            Object.assign(this.securityObject, data);
            if (this.securityObject.username !== "") {
                // Store token into local storage
                window.localStorage.setItem(this.TOKEN_COOKIE_KEY, this.securityObject.bearerToken);
                window.localStorage.setItem(this.USERNAME_COOKIE_KEY, this.securityObject.username);
                window.localStorage.setItem(this.SECURITY_OBJ_COOKIE_KEY, JSON.stringify(this.securityObject));
                this.notifySecurityObject(this.securityObject);
                console.log(`User logged in: ${this.securityObject}`);
            }
        });
    }

    logout(): void {
        this.resetSecurityObject();
        localStorage.removeItem(this.TOKEN_COOKIE_KEY);
        localStorage.removeItem(this.SECURITY_OBJ_COOKIE_KEY);
        localStorage.removeItem(this.USERNAME_COOKIE_KEY);
        this.loginStream.next(this.securityObject);
    }

     resetSecurityObject(): void {
        this.securityObject = new AppUserAuth();
    }
}