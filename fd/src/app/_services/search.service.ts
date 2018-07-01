import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SearchService {

   startedEditing = new Subject<any>();
    setTriggerValue(value: any) {
        this.startedEditing.next(new Date());
    }

    
}