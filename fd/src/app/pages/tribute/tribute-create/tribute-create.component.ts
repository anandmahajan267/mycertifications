import { globalData } from './../../../app-constant';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UtilsService } from './../../../_services/utils.service';
import { WebService } from './../../../_services/web.service';
import { Tribute } from './../../../_models/tribute.modal';
import { Country } from './../../../_models/country.modal';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-tribute-create',
  templateUrl: './tribute-create.component.html',
  styleUrls: ['./tribute-create.component.css'],
  providers: [Tribute, Country]
})
export class TributeCreateComponent implements OnInit {

  public uploaderMediaImage: FileUploader;
  public uploaderMediaVideo: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  dataProfileImage: any;
  cropperSettings: CropperSettings;
  private showProfileImage: boolean = true;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  private id: number = 0;
  private currentTab = "profile";
  private currentMediaTab = "image";
  private userDob: any;
  private userPod: any;
  private countryList: Array<any> = [];
  private stateList: Array<any> = [];
  private suburbList: Array<any> = [];
  private country_id: number = 0;
  private state_id: number = 0;
  private suburb_id: number = 0;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private tribute: Tribute,
    private webService: WebService,
    private utilsService: UtilsService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.dataProfileImage = {};
  }

  ngOnInit() {
    //this.tribute
    this.route.params
      .subscribe(
      (params: Params) => {
        //alert(params['id']);
        if (params['id']) {
          this.id = +params['id'];
        }
        this.checkTributeInfo();
      }
      );
    this.getCountryList();
    this.initMediaImage();
    this.initMediaVideo();
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
    if (this.country_id > 0) {
      this.webService.getAPI("state/" + this.country_id + "").subscribe(res => {
        this.stateList = res;
      }, resError => {
      });
    }
  }
  getSuburbList() {
    this.suburbList = [];
    if (this.state_id > 0) {
      this.webService.getAPI("suburb/" + this.state_id + "").subscribe(res => {
        this.suburbList = res;
      }, resError => {
      });
    }
  }

  onChangeCountry() {
    this.state_id = 0;
    this.suburb_id = 0;
    this.getStateList();
  }
  onChangeState() {
    this.suburb_id = 0;
    this.getSuburbList();
  }

  checkTributeInfo() {
    console.log(this.id);
    if (this.id > 0) {
      this.webService.getAPI("tribute/" + this.id + "").subscribe(res => {
        this.tribute = res;
        if (this.tribute.country) {
          this.country_id = this.tribute.country.id;
        }
        if (this.tribute.state) {
          this.state_id = this.tribute.state.id;
          this.getStateList();
        }
        if (this.tribute.suburb) {
          this.suburb_id = this.tribute.suburb.id;
          this.getSuburbList();
        }
        this.updateDateVal();
        console.log(this.tribute);

      }, resError => {
      });
    }
  }

  updateDateVal() {
    if (this.tribute.dob) {
      this.userDob = this.utilsService.getDateObject(this.tribute.dob);
    }
    if (this.tribute.pod) {
      this.userPod = this.utilsService.getDateObject(this.tribute.pod);
    }
  }


  onTabChange(tab) {
    if (this.id > 0) {
      this.currentTab = tab;
    }
    else {
      this.currentTab = 'profile';
    }
  }


  onProfileUpdate(form: NgForm) {
    console.log(form);
    console.log(form.valid);
    if (form.valid) {
      let dataObj = {
        "first_name": this.tribute.first_name,
        "middle_name": this.tribute.middle_name,
        "last_name": this.tribute.last_name,
        "dob": this.utilsService.getDateString(form.value.dob),
        "pod": this.utilsService.getDateString(form.value.pod),
      };

      console.log(dataObj);

      if (this.id > 0) {
        dataObj['id'] = this.id;
        this.webService.putAPI('tribute', dataObj, 'profile-button').subscribe(res => {
          this.utilsService.notify({ type: 'success', title: '', message: res.message });
          this.onTabChange('biography');
        }, resError => {
        });
      }
      else {
        dataObj['status'] = "PENDING";
        this.webService.postAPI('tribute', dataObj, 'profile-button').subscribe(res => {
          this.id = parseInt(res.id);
          this.onTabChange('biography');
          this.utilsService.notify({ type: 'success', title: '', message: "Tribute Created Successfully" });
        }, resError => {
        });
      }
    }
  }
  onBiographyUpdate(form: NgForm) {
    console.log(form);
    console.log(form.valid);
    if (form.valid) {
      let dataObj = {
        "biography": this.tribute.biography,
        "country": {
          "id": this.country_id
        },
        "state": {
          "id": this.state_id
        },
        "suburb": {
          "id": this.suburb_id
        }
      };
      if (this.id > 0) {
        dataObj['id'] = this.id;
        this.webService.putAPI('tribute', dataObj, 'biography-button').subscribe(res => {
          this.utilsService.notify({ type: 'success', title: '', message: res.message });
          this.onTabChange('profile_image');
        }, resError => {
        });
      }

    }
  }

  activateTheme(theme_id) {
    let dataObj = {
      "theme_id": theme_id
    };
    if (this.id > 0) {
      dataObj['id'] = this.id;
      this.webService.putAPI('tribute', dataObj, 'theme-' + theme_id + '').subscribe(res => {
        this.tribute.theme_id = theme_id;
        this.utilsService.notify({ type: 'success', title: '', message: res.message });
        //this.onTabChange('contacts');
      }, resError => {
      });
    }

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  initMediaImage() {
    this.uploaderMediaImage = new FileUploader(
      {
        url: globalData.base_url + 'tribute/media',
        //url: URL,
        itemAlias: 'media',
        additionalParameter: { id: this.id, type: 'IMAGE' },
        allowedMimeType: ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'],
        headers: [{ name: 'Authorization', value: 'Bearer' + localStorage.getItem('access_token') }]
      }
    );

    this.uploaderMediaImage.onCompleteAll = () => {
      this.uploaderMediaImage.clearQueue();
      this.checkTributeInfo();
      this.utilsService.notify({ type: 'success', title: '', message: 'Successfully Uploaded.' });
      console.log('onCompleteAll...');// the url will be in the response
    };
  }
  initMediaVideo() {
    this.uploaderMediaVideo = new FileUploader(
      {
        url: globalData.base_url + 'tribute/media',
        //url: URL,
        itemAlias: 'media',
        additionalParameter: { id: this.id, type: 'VIDEO' },
        allowedMimeType: ['video/mp4'],
        headers: [{ name: 'Authorization', value: 'Bearer' + localStorage.getItem('access_token') }]
      }
    );

    this.uploaderMediaVideo.onCompleteAll = () => {
      this.uploaderMediaVideo.clearQueue();
      this.checkTributeInfo();
      this.utilsService.notify({ type: 'success', title: '', message: 'Successfully Uploaded.' });
      console.log('onCompleteAll...');// the url will be in the response
    };
  }

  fileChangeListener($event) {
    this.showProfileImage = false;
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }

  updateProfileImage() {
    console.log(this.dataProfileImage);
    let imageData = this.dataProfileImage.image;
    let avatarData = imageData.split(',');
    let dataObj = {
      "cover_photo": avatarData[1],
      "id": this.id
    };

    this.webService.postAPI('tribute/image', dataObj, 'profile-image-button').subscribe(res => {
      this.utilsService.notify({ type: 'success', title: '', message: res.message });
      this.tribute.base_cover_photo = this.dataProfileImage.image;
      //this.dataProfileImage.original_avatar_image = this.dataProfileImage.image;
      this.showProfileImage = true;
      this.dataProfileImage = {};
    }, resError => {

    });

  }

  removeMediaFile(listItem, index) {
    //console.log(listItem);
    //console.log(index);
    // this.data.splice(index, 1);
    this.webService.putAPI('/tribute/media/' + listItem.id + '', '', '').subscribe(res => {
      this.utilsService.notify({ type: 'success', title: '', message: res.message });
      let mediaArr = this.tribute.media;
      mediaArr.splice(index, 1);
    }, resError => {
    });
  }



}
