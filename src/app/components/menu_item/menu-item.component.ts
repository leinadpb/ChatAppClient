import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ClickMenuItemEvent } from '../../shared/models/ClickMenuItemEvent';

@Component({
    selector: 'pb-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
    @Input() link: string;
    @Input() text: string;
    @Input() id: number;
    @Input() isActive: boolean;
    @Output() clicked: EventEmitter<ClickMenuItemEvent> = new EventEmitter<ClickMenuItemEvent>();

    private onClick(event: any): void {
        this.clicked.emit(new ClickMenuItemEvent(event, this.id, this.link) );
    }

}
