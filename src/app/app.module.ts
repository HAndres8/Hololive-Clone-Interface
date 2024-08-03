import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListTalentsComponent } from './components/list-talents/list-talents.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TagsComponent } from './components/tags/tags.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({ declarations: [
        AppComponent,
        ListTalentsComponent,
        NavbarComponent,
        TagsComponent,
        FooterComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
