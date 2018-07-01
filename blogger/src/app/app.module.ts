import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import {WebStorageModule, LocalStorageService} from "angular2-localstorage";
import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";

import { AuthService } from './auth/auth.service';
import { GlobalDataService } from './globaldata.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BlogModule } from './blog/blog.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    BlogModule
  ],
  providers: [GlobalDataService, AuthService, AuthGuard, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private storageService: LocalStorageService) { }
}
