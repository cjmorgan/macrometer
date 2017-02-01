import { Component } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: 'views/main.html'
})

export class MainComponent {

  tabs:Array<any> = [
    {"id": "tab1", "title": "Tab 1"},
    {"id": "tab2", "title": "Tab 2"}
  ];

  selectedTab:String = "tab1";

  onSelect(tabId:String) {
    this.selectedTab = tabId;
  }

  constructor() {}
}
