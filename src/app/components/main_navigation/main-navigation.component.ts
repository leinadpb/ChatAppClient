import { Component, Input } from '@angular/core';
import { MenuItem } from '../../shared/models/MenuItem';
import { ClickMenuItemEvent } from '../../shared/models/ClickMenuItemEvent';
import { Router } from "@angular/router";

@Component({
    selector: 'pb-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent {
    @Input() title: string;
    @Input() items: Array<MenuItem>;

    constructor(private router: Router) {
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
}