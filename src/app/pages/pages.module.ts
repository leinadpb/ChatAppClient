import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

// components
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page_not_found/page-not-found.component";

// modules
import { ComponentsModule } from "../components/components.module";
import { ServicesModule } from "../services/services.module";

// services
import { MessagesService } from '../services/message_service/messages.service';
import { SignalrService } from '../services/signalr_service/signalr.service';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        PageNotFoundComponent
    ],
    imports: [
        ComponentsModule,
        FormsModule,
        BrowserModule,
        ServicesModule
    ],
    exports: [
        HomeComponent,
        AboutComponent,
        PageNotFoundComponent
    ],
    providers: [
        MessagesService,
        SignalrService
    ]
})
export class PagesModule { }