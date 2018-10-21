import { Guid } from "guid-typescript";

export class MessageModel {
    text: string;
    id: Guid;
    authorName: string;
    likes: number;

    constructor (text: string, authorName: string) {
        this.text = text;
        this.id = Guid.create();
        this.authorName = authorName;
        this.likes = 0;
    }
}