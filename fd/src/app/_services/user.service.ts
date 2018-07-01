
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './../_models/user.modal';
import { AuthService } from './auth.service';
import { WebService } from './web.service';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
@Injectable()
export class UserService {
    private userObj: User
    constructor(private webService: WebService) {
    }

    checkUser() {
        return this.userObj;
    }
    getUser(): Promise<any> {
         return this.webService.getAPI("users").toPromise().then((res) => {
            this.setUser(res);
            return res || {};
        }).catch((error) => {
             return Promise.reject(error.message || error);
        });
    }

    setUser(user: User) {
        this.userObj = user;
        localStorage.setItem('id', user.id.toString());
        localStorage.setItem('email', user.email);
        localStorage.setItem('first_name', user.first_name);
        localStorage.setItem('last_name', user.last_name);
        localStorage.setItem('avatar', user.avatar);

        console.log('set user,', user);
    }





}