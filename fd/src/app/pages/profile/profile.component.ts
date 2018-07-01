import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './../../_models/user.modal';
import { UserService } from './../../_services/user.service';
import { WebService } from './../../_services/web.service';
import { UtilsService } from './../../_services/utils.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [User]
})
export class ProfileComponent implements OnInit {
  data: any;
  cropperSettings: CropperSettings;
  private showProfileImage: boolean = true;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private user: User,
    private userService: UserService,
    private webService: WebService,
    private utilsService: UtilsService) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.data = {};
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
    console.log(this.data);
    let imageData = this.data.image;
    let avatarData = imageData.split(',');
    let dataObj = {
      "avatar": avatarData[1]
    };
   
    this.webService.postAPI('users/avatar', dataObj, 'profile-image-button').subscribe(res => {
      this.utilsService.notify({ type: 'success', title: '', message: res.message });
      this.user.original_avatar_image = this.data.image;
      this.showProfileImage = true;
      this.data = {};
    }, resError => {

    });

  }

  //userDob: { "year": any, "month": any, "day": any };
  userDob: any;
  passwordObj = {
    old_password: "",
    new_password: "",
    confirm_new_password: ""
  };








  /*userDob = {
    "year": 2017,
    "month": 5,
    "day": 2
  };*/

  ngOnInit() {
    if (!this.userService.checkUser()) {
      this.userService
        .getUser()
        .then(result => {
          this.user = result;
          console.log('outer 1', this.user);
          this.updateDboVal();
        })
        .catch(error => console.log('outer error', error));
    } else {
      this.user = this.userService.checkUser();
      this.updateDboVal();
      console.log('outer 2', this.user);
    }
  }
  getUserInfo() {

  }

  updateDboVal() {
    if (this.user.dob) {
      this.userDob = this.utilsService.getDateObject(this.user.dob);
    }
  }

  selectdobDate(dateObj) {
    console.log(dateObj);
    if (dateObj) {
      this.user.dob = this.utilsService.getDateString(dateObj);
    }
  }

  onProfileUpdate(form: NgForm) {
    console.log(form.valid);
    if (form.valid) {
      let dataObj = {
        "first_name": this.user.first_name,
        "middle_name": this.user.middle_name,
        "last_name": this.user.last_name,
        "contact_person": this.user.contact_person,
        "phone_number": this.user.phone_number,
        "abn": this.user.abn,
        "address": this.user.address,
        "dob": this.utilsService.getDateString(form.value.dob)
      };
      this.webService.putAPI('users', dataObj, 'profile-button').subscribe(res => {
        this.userService.setUser(this.user);
        this.utilsService.notify({ type: 'success', title: '', message: res.message });
      }, resError => {

      });
    }
  }
  onNotificationUpdate(form: NgForm) {
    if (form.valid) {
      let dataObj = {
        "is_notification": this.user.is_notification,
        "is_post_notification": this.user.is_post_notification,
        "is_tribute_notification": this.user.is_tribute_notification
      };
      this.webService.putAPI('users', dataObj, 'profile-notification-button').subscribe(res => {
        this.userService.setUser(this.user);
        this.utilsService.notify({ type: 'success', title: '', message: res.message });
      }, resError => {

      });
    }
  }
  onPasswordUpdate(form: NgForm) {
    if (form.valid) {
      let dataObj = {
        "old_password": form.value.old_password,
        "new_password": form.value.new_password
      };
      this.webService.putAPI('users/change-password', dataObj, 'profile-password-button').subscribe(res => {
        this.utilsService.notify({ type: 'success', title: '', message: res.message });
      }, resError => {

      });
      form.reset();
    }
  }


}
