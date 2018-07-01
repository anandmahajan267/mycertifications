import { Post } from './../../../_models/post.modal';
import { UtilsService } from './../../../_services/utils.service';
import { Component, OnInit } from '@angular/core';
import { ThemeComponent } from '../theme.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tribute } from '../../../_models/tribute.modal';
import { WebService } from '../../../_services/web.service';
import { AuthService } from '../../../_services/auth.service';
@Component({
  selector: 'app-theme-two',
  templateUrl: './theme-two.component.html',
  styleUrls: ['./theme-two.component.css']
})
export class ThemeTwoComponent extends ThemeComponent implements OnInit {

  constructor(private route1: ActivatedRoute,
    private tribute1: Tribute,
    private post1: Post,
    private webService1: WebService,
    private utilsService1: UtilsService,
    private authService1: AuthService
  ) {
    super(route1, tribute1, post1, webService1, utilsService1, authService1);
  }

  ngOnInit() {
    this.route1.params.subscribe((params: Params) => {
      this.id = (params['id']) ? +params['id'] : 1;
      this.theme_id = (params['theme_id']) ? +params['theme_id'] : 1;
      this.getTributeInfo();
      this.getPostList();
    });
  }

}
