import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { MomentModule } from 'angular2-moment';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CommonCoreModule } from '../common-core/common-core.module';

import { ThemeComponent } from './theme/theme.component';
import { ThemeHeaderComponent } from './theme-header/theme-header.component';
import { ThemeFooterComponent } from './theme-footer/theme-footer.component';
import { ThemesComponent } from './themes.component';
import { ThemeOneComponent } from './theme/theme-one/theme-one.component';
import { ThemeTwoComponent } from './theme/theme-two/theme-two.component';

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
    CommonCoreModule
  ],
  declarations: [
    ThemeComponent,
    ThemeHeaderComponent,
    ThemeFooterComponent,
    ThemesComponent,
    ThemeOneComponent,
    ThemeTwoComponent]
})
export class ThemesModule { }
