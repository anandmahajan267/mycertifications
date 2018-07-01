import { RegistrationMessageComponent } from './cms/registration-message/registration-message.component';
import { RegistrationVerificationErrorComponent } from './cms/registration-message/registration-verification-error/registration-verification-error.component';
import { RegistrationVerificationComponent } from './cms/registration-message/registration-verification/registration-verification.component';
import { RegistrationSuccessComponent } from './cms/registration-message/registration-success/registration-success.component';
import { SearchComponent } from './cms/search/search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './_services/auth-guard.service';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main.component';
import { CmsComponent } from './cms/cms.component';

import { HomeComponent } from './cms/home/home.component';
import { TermsComponent } from './cms/terms/terms.component';
import { PrivacyComponent } from './cms/privacy/privacy.component';
import { HelpComponent } from './cms/help/help.component';
import { ContactComponent } from './cms/contact/contact.component';
import { AboutusComponent } from './cms/aboutus/aboutus.component';
import { SupportComponent } from './cms/support/support.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { TributeComponent } from './pages/tribute/tribute.component';
import { TributeViewComponent } from './pages/tribute/tribute-view/tribute-view.component';
import { TributeCreateComponent } from './pages/tribute/tribute-create/tribute-create.component';
import { TributeSearchComponent } from './pages/tribute/tribute-search/tribute-search.component';
import { ThemesComponent } from './themes/themes.component';
import { ThemeComponent } from './themes/theme/theme.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: CmsComponent,
    children:
      [
        { path: 'terms', component: TermsComponent },
        { path: 'privacy', component: PrivacyComponent },
        { path: 'help', component: HelpComponent },
        { path: 'contact-us', component: ContactComponent },
        { path: 'about-us', component: AboutusComponent },
        { path: 'support', component: SupportComponent },
        { path: 'search', component: SearchComponent },
        {
          path: 'registration', component: RegistrationMessageComponent,
          children:
            [
              { path: '', redirectTo: 'success', pathMatch: 'full' },
              { path: 'success', component: RegistrationSuccessComponent },
              { path: 'verification-success', component: RegistrationVerificationComponent },
              { path: 'link-expired', component: RegistrationVerificationErrorComponent }
            ]
        },
        { path: 'home', component: HomeComponent },
      ]
  }
];


export const routes1: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],
    children:
      [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'profile', component: ProfileComponent },
        {
          path: 'tribute', component: TributeComponent,
          children:
            [
              { path: '', redirectTo: 'view', pathMatch: 'full' },
              { path: 'view', component: TributeViewComponent },
              { path: 'create', component: TributeCreateComponent },
              { path: 'update/:id', component: TributeCreateComponent },
              { path: 'search', component: TributeSearchComponent }
            ]
        }
      ]
  },
  {
    path: 'tribute', component: ThemesComponent,
    children:
      [
        { path: '', redirectTo: 'theme', pathMatch: 'full' },
        { path: 'details/:id/:theme_id', component: ThemeComponent },
      ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes1),
    // RouterModule.forChild(routes2),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
