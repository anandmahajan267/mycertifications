import { Search } from './../../_models/search.modal';
import { WebService } from './../../_services/web.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [Search]
})
export class SearchComponent implements OnInit {
  private tributeList = [];
  private inProgressCall: boolean = false;
  private pageOffset: number = 0;
  private total_count: number = 0;
  private next_offset: number = 0;
  private tribute_search_keyword: any = '';

  private countryList: Array<any> = [];
  private stateList: Array<any> = [];
  private suburbList: Array<any> = [];

  constructor(private webService: WebService, private search: Search ) { }

  ngOnInit() {

    this.search.keyword = '';
    this.search.last_name = '';
    this.search.country = 0;
    this.search.state = 0;
    this.search.city = 0;
    this.search.pod = '';

    this.searchTribute();
    this.getCountryList();
  }
  searchTribute() {
    this.pageOffset = 0;
    this.total_count = 0;
    this.getList('simple');

  }

  onAdvanceFilter(form: NgForm) {
    console.log(this.search);
    console.log(form);
    console.log(form.valid);
    if (form.valid) {
      this.getList('advanced');
    }
  }

  getList(actTyp: string) {
    let queryObj:any;
    if (actTyp == "simple") {
      if (!this.tribute_search_keyword) {
        this.tribute_search_keyword = '';
      }
      queryObj = {
        "keyword":this.tribute_search_keyword
      }

    }
    else {
      queryObj = {
        "keyword":this.search.keyword,
        "last_name":this.search.last_name
      };
      if(this.search.pod!=""){
        queryObj['pod'] = this.search.pod;
      }
      if(this.search.country!=0){
        queryObj['country'] =this.search.country;
      }
      if(this.search.state!=0){
        queryObj['state'] =this.search.state;
      }
      if(this.search.city!=0){
        queryObj['city'] = this.search.city;
      }
    }
    if (this.pageOffset == 0) {
      this.tributeList = [];
      this.total_count = 0;
    }
    this.inProgressCall = true;
    //https://app.passedon.com/tribute/search/0?city=127500&country=12&keyword=Francis&last_name=Oliveri&offset=0&pod=2011&state=142
    this.webService.getAPI("tribute/search/" + this.pageOffset + "",queryObj).subscribe(res => {
      if (this.pageOffset == 0) {
        if (res.list) {
          this.tributeList = res.list;
        }
        this.total_count = res.count;
      }

      this.next_offset = res.next_offset;
      this.inProgressCall = false;
    }, resError => {
    });
  }



  getCountryList() {
    this.countryList = [];
    this.webService.getAPI("countries").subscribe(res => {
      this.countryList = res;
    }, resError => {
    });
  }

  getStateList() {
    this.stateList = [];
    if (this.search.country > 0) {
      this.webService.getAPI("state/" + this.search.country + "").subscribe(res => {
        this.stateList = res;
      }, resError => {
      });
    }
  }
  getSuburbList() {
    this.suburbList = [];
    if (this.search.state > 0) {
      this.webService.getAPI("suburb/" + this.search.state + "").subscribe(res => {
        this.suburbList = res;
      }, resError => {
      });
    }
  }

  onChangeCountry() {
    this.search.state = 0;
    this.search.city = 0;
    this.getStateList();
  }
  onChangeState() {
    this.search.city = 0;
    this.getSuburbList();
  }

}
