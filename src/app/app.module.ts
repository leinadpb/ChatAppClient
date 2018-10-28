import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from "@angular/router";

import { ComponentsModule } from './components/components.module';
import { PagesModule } from "./pages/pages.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page_not_found/page-not-found.component';
import { LoginRegisterComponent } from './pages/login_register/login-register.component';

// services
import { SignalrService } from './services/signalr_service/signalr.service';
import { AuthService } from './services/auth_service/AuthService';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'auth', component: LoginRegisterComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot( appRoutes ),
    BrowserModule,
    ComponentsModule,
    PagesModule
  ],
  providers: [
    SignalrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
