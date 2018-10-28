import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageModel } from "../../shared/models/MessageModel";
import { MessagesService } from '../../services/message_service/messages.service';
import { SignalrService } from '../../services/signalr_service/signalr.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth_service/AuthService';
import { AppUserAuth } from '../../shared/models/AppUserAuth';

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
        private _signalrService: SignalrService,
        private router: Router,
        private _authService: AuthService) { }

    ngOnInit(): void {
        let bearerToken = window.localStorage.getItem(this._authService.TOKEN_COOKIE_KEY);
        let emailCurrent = window.localStorage.getItem(this._authService.USERNAME_COOKIE_KEY);
        console.log(`FROM HOME, TOKEN >>>>>> ${bearerToken}`);
        if (bearerToken !== null || bearerToken !== '') {
            if (emailCurrent !== null) {
                this.userName = emailCurrent;
            }
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
            this._authService.login$.subscribe((data: AppUserAuth) => {
                console.log(`Current user Username form Home component >>>>>> ${data.username}`);
                this.setUserName(data.username);
            });
        }
        if (bearerToken === null) {
            console.log('Redirecting to auth login....');
            this.router.navigate(['/auth']);
        }
    }

    private setUserName(usrName: string): void {
        this.userName = usrName;
    }

    private sendMessage(event: any): void {
        this.validateMessage();
        if (this.isValidMessage) {
            // send the message....
            let msg = new MessageModel(this.message, this.userName);
            this._signalrService.getConnectionId().then(id => {
                this._serviceMsg.saveMessage(msg, id).subscribe(data => {
                    // this.messagesQueue.unshift(data);
                    console.log(data);
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
        // this.subscription.unsubscribe();
    }
}