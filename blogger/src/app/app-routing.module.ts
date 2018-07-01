
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
