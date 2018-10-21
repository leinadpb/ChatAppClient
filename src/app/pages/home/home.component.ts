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

    @Input() message: string = '';
    private isValidMessage: boolean = false;
    @Input() messagesQueue: Array<MessageModel> = [];
    @Input() totalMessages: number;
    private totalUsers: number;
    @Input() userName: string = '';

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
            //console.log("Event cpatured");
            this.messagesQueue.unshift(res);
        });
    }

    private sendMessage(event: any): void {
        this.validateMessage();
        if (this.isValidMessage) {
            // send the message....
            let msg = new MessageModel(this.message, this.userName);
            this._signalrService.getConnectionId().then(id => {
                this._serviceMsg.saveMessage(msg, id).subscribe(data => {
                    // this.messagesQueue.unshift(data);
                    this._signalrService.anotherMessage(data);
                    console.log('all clients should be notified!');
                });
            }).catch(err => console.log(err));
            
            // Erease current message
            this.message = '';
        }
    }

    private validateMessage() {
        if (this.message.length === 0 || this.userName.length === 0) {
            this.isValidMessage = false;
        }else {
            this.isValidMessage = true;
        }
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}