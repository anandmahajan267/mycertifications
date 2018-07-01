

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { LocalStorage, SessionStorage } from "angular2-localstorage/WebStorage";
import 'rxjs/Rx';
import { GlobalDataService } from './../../globaldata.service';
import { AuthService } from './../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @LocalStorage('token') public token: string;
  result: Object;
  error: String;
  showError: boolean;
  constructor(private http: Http, private gd: GlobalDataService, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.error = '';
    this.showError = false;
  }

  onSignin(form: NgForm) {
    const value = form.value;
    console.log(form);

    //this.http.get('http://localhost:3000/api/users');

    this.result = {};
    this.http.get(this.gd.base_url + 'authlogin/' + value.email + '/' + value.password + '')
      .map((res: Response) => res.json())
      .subscribe(
      res => {
        this.result = res;
        this.error = "";
        this.showError = false;
        this.token = value.email;
        this.authService.setAuthToken(value.email);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.error = error.json().message;
        this.showError = true;
      });


  }

}
