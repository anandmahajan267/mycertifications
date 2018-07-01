import { UtilsService } from './../../_services/utils.service';
import { ShareService } from './../../_services/share.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { AuthService } from './../../_services/auth.service';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  providers: []
})
export class LeftMenuComponent implements OnInit {
  private tribute_search_keyword: any = '';

  constructor(private shareService: ShareService,
    private router: Router,
    private utilsService: UtilsService) { }

  ngOnInit() {
  }

  searchTribute() {
    this.shareService.setMapValue('tribute_search_keyword', this.tribute_search_keyword);
    this.shareService.setMapValue('search_type', 'simple');
    this.utilsService.triggerSearchClick('simple');
    let currentUrl = this.router.url;
    if (currentUrl != '/tribute/search') {
      this.router.navigate(['tribute/search']);
    }
  }
  advancedTribute() {
    this.shareService.setMapValue('tribute_search_keyword', this.tribute_search_keyword);
    this.shareService.setMapValue('search_type', 'advanced');
    this.utilsService.triggerSearchClick('advanced');
    let currentUrl = this.router.url;
    if (currentUrl != '/tribute/search') {
      this.router.navigate(['tribute/search']);
    }
   
  }

}
