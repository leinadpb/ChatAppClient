import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MessageModel } from "../../shared/models/MessageModel";
import { MessagesService } from '../../services/message_service/messages.service';
import { SignalrService } from '../../services/signalr_service/signalr.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pb-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    @Input() message: string = 'Sample message...';
    private isValidMessage: boolean = true;
    @Input() messagesQueue: Array<MessageModel> = [];
    @Input() totalMessages: number;
    private totalUsers: number;

    private subscription: Subscription;
    private messagesSubscription: Subscription;

    constructor(private _serviceMsg: MessagesService,
        private _signalrService: SignalrService) { }

    ngOnInit(): void {
        this._serviceMsg.getMessages().subscribe(data => {
            if (!!data) {
                this.messagesQueue = data;
            }
        });
        this.subscription = this._signalrService.notifyObservable$.subscribe((res) => {
            this.totalUsers = res;
        });
        this.messagesSubscription = this._signalrService.messagesObservable$.subscribe((res) => {
            console.log("Event cpatured");
            this.messagesQueue.unshift(res);
        });
    }

    private sendMessage(event: any): void {
        this.validateMessage();
        if (this.isValidMessage) {
            // send the message....
            let msg = new MessageModel(this.message, 'Daniel');
            this._serviceMsg.saveMessage(msg).subscribe(data => {
                // this.messagesQueue.unshift(data);
                this._signalrService.anotherMessage(data);
            });
            // Erease current message
            this.message = '';
        }
    }

    private validateMessage() {
        if (this.message.length === 0) {
            this.isValidMessage = false;
        }else {
            this.isValidMessage = true;
        }
    }

    changeTotalMessages(nums: number) {
        this.totalMessages = nums;
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}