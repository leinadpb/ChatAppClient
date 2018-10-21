export class MenuItem {
    link: string;
    text: string;
    id: number;
    isActive: boolean;

    constructor(id: number, text: string, link: string, isActive: boolean) {
        this.link = link;
        this.text = text;
        this.id = id;
        this.isActive = isActive;
    }
}