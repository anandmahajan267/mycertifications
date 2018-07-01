import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalDataService } from './../globaldata.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  result: Array<any>;
  constructor(private http: Http, private gd: GlobalDataService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.result = [];
    this.http.get(this.gd.base_url + 'blogs/')
      .map((res: Response) => res.json())
      .subscribe(
      res => {
        this.result = res;

      },
      error => {
        console.log(error.json());
      });

  }

}
