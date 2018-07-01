import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Injectable()
export class AuthService {
  //public token:string
  route: string;
  token = localStorage.getItem("access_token");
  //token: string ='';
  constructor(private router: Router, 
    private location: Location, 
    private activatedRoute:ActivatedRoute,
    private utilsService: UtilsService) {
  }


  getAuthToken() {
    console.log("this.token---", this.token);
    return this.token;
  }
  setAuthToken(tkn) {
    this.token = tkn;
  }

  suSetAuthToken() {
    this.token = '';
  }

  isAuthenticated() {
    //this.headerFlag();
    // alert(this.token);
    if ((this.token != '') && (this.token)) {
      return true;
    }
    else {
      return false;
    }
  }

  loginClick(){
    this.utilsService.triggerAuthClick('login');
  }
  signupClick(){
    this.utilsService.triggerAuthClick('signup');
  }

  headerFlag(){
    /*this.router.events.subscribe((val) => {
      if(this.location.path() != ''){
        this.route = this.location.path();
        console.log(val);
      } else {
        this.route = 'Home1'
      }
      console.log('headerFlag',this.route);
    });*/

    /*this.r.data.subscribe((d) => {
      console.log('data', d);
    });*/

   /* this.r.data.subscribe((data) => {
      console.log('data', data.header);
    });*/
    console.log('activatedRoute-',this.activatedRoute.snapshot.data['header']);
    

  }
}
