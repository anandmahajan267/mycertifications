import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../_services/auth.service';
declare var $: any;
@Component({
  selector: 'app-cms-header',
  templateUrl: './cms-header.component.html',
  styleUrls: ['./cms-header.component.css'],
  providers: [AuthService]
})
export class CmsHeaderComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() {
    console.log('init header...')
  }
}
