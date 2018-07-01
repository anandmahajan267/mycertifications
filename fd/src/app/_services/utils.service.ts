
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
declare var $: any;
@Injectable()
export class UtilsService {
    searchClicked = new Subject<any>();
    authClicked = new Subject<any>();
    constructor() {
    }

    triggerSearchClick(val:any){
        this.searchClicked.next(val);
    }
    triggerAuthClick(val:any){
        console.log('triggerAuthClick - ',val);
        
        this.authClicked.next(val);
    }

    getDateObject(dateString: string) {
        const [year, month, day] = dateString.split("-");
        let dateObj = {
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day)
        };
        return dateObj;
    }

    getDateString(dateObj: any) {
        let dateString: string;
        let year = dateObj.year;
        let month = (dateObj.month >= 10) ? dateObj.month : '0' + dateObj.month;
        let day = (dateObj.day >= 10) ? dateObj.day : '0' + dateObj.day;
        dateString = year.toString() + '-' + month.toString() + '-' + day.toString();
        return dateString;
    }

    notify(notifyObj: any) {
        $.notify(
            {
                title: notifyObj.title,
                message: notifyObj.message
            },
            {
                type: notifyObj.type
            }
        );
    }



}