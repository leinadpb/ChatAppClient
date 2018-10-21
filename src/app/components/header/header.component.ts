import { Component } from '@angular/core';
import { MenuItem } from '../../shared/models/MenuItem';

@Component({
    selector: 'pb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    private items: Array<MenuItem>;

    constructor() {
        this.items = [
            {id: 0, text: 'Home', link: '/home', isActive: true},
            {id: 1, text: 'About us', link: '/about', isActive: false},
            {id: 2, text: 'Contact', link: '/contact', isActive: false}
        ];
    }
}
