import { UtilsService } from './../../../_services/utils.service';

import { WebService } from './../../../_services/web.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-tribute-view',
  templateUrl: './tribute-view.component.html',
  styleUrls: ['./tribute-view.component.css']
})
export class TributeViewComponent implements OnInit {
  private transferTributeModalService: any;
  private tributeList = [];
  private inProgressCall: boolean = false;
  private is_transfer: boolean = false;
  private currentTab: string = 'my_tribute';
  private currentId: number = 0;

  public title: string = 'Confirmation!';
  public message: string = 'Are you sure you want to delete this record?';

  private transferTribute = {
    "first_name": "",
    "last_name": "",
    "email": "",
    "phone_number": "",
  };

  constructor(private webService: WebService,
    private modalService: NgbModal,
    private utilsService: UtilsService) {

  }

  ngOnInit() {
    this.getTributeList();
  }

  openTransferTribute(content,item) {
    this.currentId = item.id
    this.transferTributeModalService = this.modalService.open(content);
  }

  onTransferTribute(form: NgForm) {
    console.log(this.transferTribute);
    console.log(form.valid);
    if (form.valid) {
      const value = form.value;
      console.log(form);
      this.webService.putAPI('tribute/transfer/'+this.currentId+'', this.transferTribute, 'transfer-tribute-button').subscribe(res => {
        this.transferTributeModalService.close();
        this.utilsService.notify({ type: 'success', title: '', message: res.message });
        this.getTributeList();
        this.transferTribute = {
          "first_name": "",
          "last_name": "",
          "email": "",
          "phone_number": "",
        }
        //this.user
        //this.getUserInfo();
      }, resError => {

      });

    } else {
      for (let inner in form.controls) {
        form.controls[inner].markAsTouched();
      }
    }
  }

  getTributeList() {
    this.tributeList = [];
    this.inProgressCall = true;

    this.webService.getAPI("tribute/list?is_transfer=" + this.is_transfer + "").subscribe(res => {
      this.tributeList = res;
      this.inProgressCall = false;
    }, resError => {
    });
  }

  onTabChange(tab) {
    if (tab == "my_tribute") {
      this.is_transfer = false;
    }
    else {
      this.is_transfer = true;
    }
    this.currentTab = tab;
    this.getTributeList();
  }

  confirmPopup(typ, item) {
    console.log(item);
    console.log(typ);
    if (typ == 1) {
      this.webService.deleteAPI("tribute/" + item.id + "", '').subscribe(res => {
        this.utilsService.notify({ type: 'success', title: '', message: res.message });
        this.getTributeList();
      }, resError => {
      });

    }
  }



}
