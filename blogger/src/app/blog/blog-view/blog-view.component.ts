import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { GlobalDataService } from './../../globaldata.service';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {
  id: number;
  result: Object = {};
  resultComments: Array<any>;
  constructor(private http: Http, private gd: GlobalDataService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
      );

      this.getBlogDetails();
      this.getBlogComments();
  }

  getBlogDetails() {
    this.result = {};
    this.http.get(this.gd.base_url + 'blog/'+this.id+'')
      .map((res: Response) => res.json())
      .subscribe(
      res => {
        this.result = res;

      },
      error => {
        console.log(error.json());
      });

  }

  getBlogComments() {
    this.resultComments = [];
    this.http.get(this.gd.base_url + 'blog/'+this.id+'/comments')
      .map((res: Response) => res.json())
      .subscribe(
      res => {
        this.resultComments = res;

      },
      error => {
        console.log(error.json());
      });

  }

}
