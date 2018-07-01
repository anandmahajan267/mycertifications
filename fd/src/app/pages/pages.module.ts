import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { ProfileComponent } from './profile/profile.component';
import { TributeComponent } from './tribute/tribute.component';
import { TributeViewComponent } from './tribute/tribute-view/tribute-view.component';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { TributeCreateComponent } from './tribute/tribute-create/tribute-create.component';
import { TributeSearchComponent } from './tribute/tribute-search/tribute-search.component';
import { MomentModule } from 'angular2-moment';

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { FileUploadModule } from 'ng2-file-upload'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    CustomFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    MomentModule,
    FileUploadModule
  ],
  declarations: [
    ImageCropperComponent,
    MainComponent,
    DashboardComponent,
    LeftMenuComponent,
    PageHeaderComponent,
    PageFooterComponent,
    ProfileComponent,
    TributeComponent,
    TributeViewComponent,
    TributeCreateComponent,
    TributeSearchComponent

  ],
  exports: [LeftMenuComponent, PageHeaderComponent, PageFooterComponent]
})
export class PagesModule { }
