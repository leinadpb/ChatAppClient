import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/MenuItem';
import { AuthService } from '../../services/auth_service/AuthService';
import { AppUserAuth } from '../../shared/models/AppUserAuth';

@Component({
    selector: 'pb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private items: Array<MenuItem>;
    private isAuthenticated: boolean;

    constructor(private authService: AuthService) {
        this.items = [
            {id: 0, text: 'Home', link: '/home', isActive: true},
            {id: 1, text: 'About us', link: '/about', isActive: false},
            {id: 2, text: 'Contact', link: '/contact', isActive: false}
        ];
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log(`FROM HEADER ONINIT: ${this.authService.securityObject}`);
        let token = window.localStorage.getItem(this.authService.TOKEN_COOKIE_KEY);
        if (token !== null || token !== '') {
            this.isAuthenticated = true;
        }
        if (token === null) {
            this.isAuthenticated = false;
        }

        this.authService.login$.subscribe((data: AppUserAuth) => {
            this.isAuthenticated = data.isAuthenticated;
        });
    }
}
