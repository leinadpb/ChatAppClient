export class ClickMenuItemEvent {
    event: any;
    id: number;
    link: string;
    constructor (e: any, id: number, link: string) {
        this.event = e;
        this.id = id;
        this.link = link;
    }
}