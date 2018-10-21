import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainNavigationComponent } from './main_navigation/main-navigation.component';
import { HeaderComponent } from './header/header.component';
import { MenuItemComponent } from './menu_item/menu-item.component';
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    declarations: [
        MainNavigationComponent,
        HeaderComponent,
        MenuItemComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        MainNavigationComponent,
        HeaderComponent,
        MenuItemComponent,
        FooterComponent
    ],
    providers: [

    ]
})
export class ComponentsModule { }