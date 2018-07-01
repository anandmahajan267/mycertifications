import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../_models/user.modal';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Logout } from './../../_services/logout';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  providers: [Logout]
})
export class PageHeaderComponent implements OnInit {

  constructor(private logout: Logout) { }
  private name: string;
  ngOnInit() {
    this.name = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
  }

}
