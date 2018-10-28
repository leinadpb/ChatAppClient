import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/MenuItem';
import { ClickMenuItemEvent } from '../../shared/models/ClickMenuItemEvent';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth_service/AuthService";
@Component({
    selector: 'pb-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
    @Input() title: string;
    @Input() items: Array<MenuItem>;
    @Input() isAuthenticated: boolean;

    constructor(private router: Router, private authService: AuthService) {
        if (!!this.items) {
            this.items = [];
        }
    }

    private itemClicked(event: ClickMenuItemEvent): void {
        this.items.forEach( (item) => {
            if (event.id === item.id) {
                item.isActive = true;
            }else {
                item.isActive = false;
            }
        });
        this.router.navigate([event.link]);
    }

    private logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}