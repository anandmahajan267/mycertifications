import { globalData } from './../app-constant';
import { UserRole } from './../enumeration';
import { UserService } from './../_services/user.service';
import { WebService } from './../_services/web.service';
import { Router } from '@angular/router';
import { Logout } from './../_services/logout';
import { AuthService } from './../_services/auth.service';
import { User } from './../_models/user.modal';
import { UtilsService } from './../_services/utils.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NgForm } from '@angular/forms';
//import { FormsModule }   from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-common-core',
  templateUrl: './common-core.component.html',
  styleUrls: ['./common-core.component.css'],
  providers: [User, AuthService, Logout]
})
export class CommonCoreComponent implements OnInit {
  private _recaptchaKey: string = globalData.recaptchaKey;
  private fpSuccess: boolean = false;
  private fpRKey: string = '';
  private fpRKeyTouch: boolean = false;

  private signupRKey: string = '';
  private signupRKeyTouch: boolean = false;

  subscription: Subscription;
  public confirm_new_password: string = "";
  @ViewChild('aTagLogin') aTagLogin: ElementRef;
  @ViewChild('aTagSignup') aTagSignup: ElementRef;

  constructor(
    private utilsService: UtilsService,
    private user: User,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private logout: Logout,
    private webService: WebService,
    private userService: UserService
  ) { }
  loginModalService;
  signupModalService;
  fpModalService;

  ngOnInit() {

    this.subscription = this.utilsService.authClicked
      .subscribe(
      (selVal: any) => {
        console.log(selVal);
        if (selVal == 'login') {
          this.triggerLoginClick();
        }
        else if (selVal == 'signup') {
          this.triggerSignupClick();
        }
      }
      );
  }

  fpCallback(captchaResponse: string) {
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.fpRKey = captchaResponse;
  }
  signUpCallback(captchaResponse: string) {
    //console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.signupRKey = captchaResponse;
  }

  triggerLoginClick() {
    let el: HTMLElement = this.aTagLogin.nativeElement as HTMLElement;
    el.click();
  }
  triggerSignupClick() {
    let el: HTMLElement = this.aTagSignup.nativeElement as HTMLElement;
    el.click();
  }

  openLogin(content) {
    this.loginModalService = this.modalService.open(content);
  }
  openSignup(content) {
    this.signupModalService = this.modalService.open(content);
  }
  openForgotPassword(content) {
    this.fpSuccess = false;
    this.fpModalService = this.modalService.open(content);
  }

  onSignin(form: NgForm) {
    console.log(this.user);
    console.log(form.valid);
    if (form.valid) {
      const value = form.value;
      console.log(form);
      this.webService.getAccesstoken('users/login', this.user, 'sign-in-button').subscribe(res => {
        this.loginModalService.close();
        this.getUserInfo();
      }, resError => {

      });

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched();
      }
    }
  }

  onSignUp(form: NgForm) {
    console.log(this.user);
    console.log(form.valid);
    if (form.valid) {
      const value = form.value;
      console.log(form);
      if (this.signupRKey == '') {
        this.signupRKeyTouch = true;
        return false;
      }
      let dataPost = this.user;
      dataPost['role'] = UserRole.FUNERAL_DIRECTOR;
      dataPost['captcha_response'] = this.signupRKey;
      console.log(dataPost);
      this.webService.postAPI('users/signup', dataPost, 'signup-button').subscribe(res => {
        this.signupModalService.close();
        this.signupRKeyTouch = false;
        this.signupRKey = '';
        this.router.navigate(['registration/success']);
        form.reset();
        this.fpRKey = '';
        //this.user
        //this.getUserInfo();
      }, resError => {

      });

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched();
      }
    }
  }
  onForgotPassword(form: NgForm) {
    console.log(this.user);
    console.log(form.valid);
    if (form.valid) {
      const value = form.value;
      console.log(form);
      if (this.fpRKey == '') {
        this.fpRKeyTouch = true;
        return false;
      }
      let dataPost = {
        "email": form.value['email'],
        "captcha_response": this.fpRKey,
      }

      console.log(dataPost);
      this.webService.postAPI('users/forgot-password', dataPost, 'forgot-password-button').subscribe(res => {
        // this.fpModalService.close();
        this.fpRKeyTouch = false;
        this.fpRKey = '';
        this.fpSuccess = true;

        setTimeout(() => {
          this.fpModalService.close();
          this.fpSuccess = false;;
        }, 5000);

        form.reset();
        //this.user
        //this.getUserInfo();
      }, resError => {

      });

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched();
      }
    }
  }

  getUserInfo() {
    this.webService.getAPI("users").subscribe(res => {
      this.user = res;
      this.userService.setUser(this.user);
      //console.log(this.user);
      //console.log(this.userService.getUser());

      this.router.navigate(['dashboard']);

    }, resError => {
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
