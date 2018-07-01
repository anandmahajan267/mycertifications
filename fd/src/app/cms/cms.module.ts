import { CommonCoreModule } from './../common-core/common-core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CmsComponent } from './cms.component';
import { HomeComponent } from './home/home.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SupportComponent } from './support/support.component';
import { MomentModule } from 'angular2-moment';
import { CustomFormsModule } from 'ng2-validation';

import { CmsHeaderComponent } from './cms-header/cms-header.component';
import { CmsFooterComponent } from './cms-footer/cms-footer.component';
import { SearchComponent } from './search/search.component';
import { RegistrationSuccessComponent } from './registration-message/registration-success/registration-success.component';
import { RegistrationVerificationComponent } from './registration-message/registration-verification/registration-verification.component';
import { RegistrationVerificationErrorComponent } from './registration-message/registration-verification-error/registration-verification-error.component';
import { RegistrationMessageComponent } from './registration-message/registration-message.component';


@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    CustomFormsModule,
    NgbModule,
    MomentModule,
    CommonCoreModule
  ],
  declarations: [
    CmsComponent, 
    HomeComponent,
    TermsComponent, 
    PrivacyComponent, 
    HelpComponent, 
    ContactComponent, 
    AboutusComponent, 
    SupportComponent, 
    CmsHeaderComponent, 
    CmsFooterComponent, 
    SearchComponent, RegistrationSuccessComponent, RegistrationVerificationComponent, RegistrationVerificationErrorComponent, RegistrationMessageComponent
  ],
})
export class CmsModule { }
