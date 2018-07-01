
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Logout {

    constructor(private router: Router, private authService: AuthService) {
    }

    logout() {
        this.authService.setAuthToken("");
        localStorage.removeItem('access_token');
        this.router.navigate(["home"]);
    }

    
    
}