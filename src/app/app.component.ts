import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SignalrService } from './services/signalr_service/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private title: string = 'chat-app';

  constructor(private signalr: SignalrService) { }

  ngOnInit(): void {
    this.signalr.startPipeline();
  }
}
