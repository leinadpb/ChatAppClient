import { Component, Input } from '@angular/core';

import { AuthService } from '../../services/auth_service/AuthService';
import { UserLoginDTO } from '../../shared/models/UserLoginDTO';
@Component({
    selector: 'pb-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent {

    @Input() username: string;
    @Input() password: string;

    private showLogin: boolean = true;
    private showRegister: boolean = false;

    constructor(private authService: AuthService) { }

    toggleView(): void {
        this.showLogin = !this.showLogin;
        this.showRegister = !this.showRegister;
    }

    login() {
        let user = new UserLoginDTO();
        user.username = this.username;
        user.password = this.password;
        this.authService.login(user);
        //---
        //console.log(this.authService.getUserToken());
    }
}