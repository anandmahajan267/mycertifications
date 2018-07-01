
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './_services/auth.service';
import { WebService } from './_services/web.service';
import { Logout } from './_services/logout';
import { AuthGuard } from './_services/auth-guard.service';
import { UtilsService } from './_services/utils.service';
import { UserService } from './_services/user.service';
import { ShareService } from './_services/share.service';

import { CmsModule } from './cms/cms.module';
import { PagesModule } from './pages/pages.module';
import { ThemesModule } from './themes/themes.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    MomentModule,
    AppRoutingModule,
    CmsModule,
    PagesModule,
    ThemesModule
  ],
  providers: [AuthService, AuthGuard, WebService, Logout, UserService, UtilsService, ShareService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('welcome!!!');
  }
}
