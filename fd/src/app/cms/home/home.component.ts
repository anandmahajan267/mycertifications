import { AuthService } from './../../_services/auth.service';
import { Component, OnInit,AfterViewInit } from '@angular/core';
declare var WOW: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthService]
}) 
export class HomeComponent implements OnInit,AfterViewInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    new WOW().init();
  }

}
