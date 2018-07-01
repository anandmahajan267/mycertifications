
import { Component, OnInit } from '@angular/core';
declare var classie: any;
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  constructor() { }


  ngOnInit() {
    var menuLeft = document.getElementById('cbp-spmenu-s1'),
      showLeftPush = document.getElementById('showLeftPush'),
      body = document.body;
    showLeftPush.onclick = function () {
      classie.toggle(this, 'active');
      classie.toggle(body, 'cbp-spmenu-push-toright');
      classie.toggle(menuLeft, 'cbp-spmenu-open');
      disableOther('showLeftPush');
    };
    function disableOther(button) {
      if (button !== 'showLeftPush') {
        classie.toggle(showLeftPush, 'disabled');
      }
    }
  }

}
