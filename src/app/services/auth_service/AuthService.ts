import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserApp } from '../../shared/models/UserApp';
import { TokenDTO } from '../../shared/models/TokenDTO';
import { UserLoginDTO } from '../../shared/models/UserLoginDTO';

@Injectable()
export class AuthService {

    private ENDPOINT = "http://127.0.0.1:5000/api/account";

    private commonHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    public isAuthenticated: boolean = false;
    public currentUserToken: string;
    public currentUserEmail: string;

    constructor(private http: HttpClient) { }

    getIsAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    getUserToken(): string {
        console.log(`ACTUAL VALUE OF TOKEN IN SERVICE: ${this.currentUserToken}`);
        return this.currentUserToken;
    }

    getUserEmail(): string {
        return this.currentUserEmail;
    }

    login(user: UserLoginDTO): void {
        this.http.post(this.ENDPOINT + "/login", user, {
            headers: this.commonHeaders
        }).subscribe((data: TokenDTO) => {
            if (data.token !== null || data.token !== '') {
                this.currentUserToken = data.token;
                this.isAuthenticated = true;
                this.currentUserEmail = data.email;
                localStorage.setItem('token', data.token);
                console.log(`Logged in SUCCESSFULLY! User token: ${data.token}`);
            }
        }, err => {
            console.log(`ERROR when loggin in >>>>>>>>>>> ${err}`);
        });
    }

    register(user: UserApp): Observable<any> {
        return this.http.post(this.ENDPOINT + "/register", user, {
            headers: this.commonHeaders
        });
    }

    logout(): void {
        this.isAuthenticated = false;
        this.currentUserToken = undefined;
        this.currentUserEmail = undefined;
    }
}