import { Component, OnInit } from '@angular/core';
import { IdService } from '../services/id.service';

@Component({
  selector: 'header',
  templateUrl: 'views/header.html'
})

export class HeaderComponent  implements OnInit { 
  appId:String = "Loading...";

  constructor(
    private idService:IdService
  ) {}

  getId() {
    this.idService
      .getMessage()
      .then((idValue) => {
        console.log("======" + idValue + "======");
        this.appId = idValue;
      });
  }

  ngOnInit() {
    this.getId();
  }
}
