import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth_service/AuthService';
import { UserLoginDTO } from '../../shared/models/UserLoginDTO';
import { TokenDTO } from '../../shared/models/TokenDTO';
import { UserApp } from '../../shared/models/UserApp';
import { AppUserAuth } from '../../shared/models/AppUserAuth';

@Component({
    selector: 'pb-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

    @Input() username: string;
    @Input() password: string;

    private showLogin: boolean = true;
    private showRegister: boolean = false;
    private isAuthenticated: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.login$.subscribe((data: AppUserAuth) => {
            this.isAuthenticated = data.isAuthenticated;
            if (this.isAuthenticated) {
                // redirect to home...
                this.router.navigate(['/home']);
            }
        });
    }

    toggleView(): void {
        this.showLogin = !this.showLogin;
        this.showRegister = !this.showRegister;
    }

    login() {
        let user = new UserApp();
        user.username = this.username;
        user.password = this.password;
        this.authService.login(user);
    }
}