import { Post } from './../../_models/post.modal';
import { AuthService } from './../../_services/auth.service';
import { UtilsService } from './../../_services/utils.service';
import { globalData } from './../../app-constant';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Tribute } from '../../_models/tribute.modal';
import { WebService } from '../../_services/web.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  providers: [Tribute, AuthService, Post]
})
export class ThemeComponent implements OnInit {
  id: number = 0;
  theme_id: number = 1;
  post_offset: number = 0;
  showShortDesc: boolean = true;
  currentTab: string = 'home';
  //message_post: any = '';
  showComment: any = {};
  showPost: any = {};
  posts: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private tribute: Tribute,
    private post: Post,
    private webService: WebService,
    private utilsService: UtilsService,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = (params['id']) ? +params['id'] : 1;
      this.theme_id = (params['theme_id']) ? +params['theme_id'] : 1;
      // this.getTributeInfo();
    });
  }

  getTributeInfo() {
    console.log(this.id);
    if (this.id > 0) {
      this.webService.getAPI("tribute/" + this.id + "").subscribe(res => {
        this.tribute = res;
        console.log(this.tribute);
      }, resError => {
      });
    }
  }
  getPostList() {
    console.log(this.id);
    if (this.id > 0) {
      this.webService.getAPI("post/" + this.id + "/" + this.post_offset + "").subscribe(res => {
        if (res.list) {
          this.post = res.list;
        }

        console.log(this.tribute);
      }, resError => {
      });
    }
  }

  onPostSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      let dataObj = {
        "content": form.value.message_post,
        "title": '',
        "tribute_id": this.id
      };
      this.webService.postAPI('post', dataObj, 'post-button').subscribe(res => {
        this.utilsService.notify({ type: 'success', title: '', message: "Post added successfully" });
        this.getPostList();
      }, resError => {

      });
      form.reset();
    }
  }

  onPostCommentSubmit(form: NgForm,type_id:number) {
    console.log(form);
    if (form.valid) {
      let dataObj = {
        "content": form.value.message_post_comment,
        "type_id": type_id
      };
      let btnId = 'post-comment-button-'+type_id+'';
     // alert(btnId);
      this.webService.postAPI('post/comment', dataObj, btnId).subscribe(res => {
        this.utilsService.notify({ type: 'success', title: '', message: "Comment added successfully" });
        this.getPostList();
        form.reset();
      }, resError => {

      });
     
    }
  }

  onTabChange(tab) {
    this.currentTab = tab;
  }




}
