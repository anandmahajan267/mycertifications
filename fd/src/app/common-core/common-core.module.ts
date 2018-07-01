
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { CustomFormsModule } from 'ng2-validation';


import { CommonCoreComponent } from './common-core.component';
import { RecaptchaModule } from 'ng2-recaptcha';
@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    CustomFormsModule,
    NgbModule,
    RecaptchaModule.forRoot(),
    MomentModule
   ],
  exports: [
    CommonCoreComponent,
  ],
  declarations: [CommonCoreComponent]
})
export class CommonCoreModule { }
