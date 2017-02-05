import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { HeaderComponent }  from '../components/header.component';
import { MainComponent} from '../components/main.component';
import { ProtoComponent } from '../components/proto.component';

import { IdService } from '../services/id.service';
import { FoodService } from '../services/food.service';

import { routes } from '../routes/routes';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    HeaderComponent,
    MainComponent,
    ProtoComponent
  ],
  providers: [
    IdService,
    FoodService
  ],
  bootstrap: [
    HeaderComponent,
    MainComponent,
    ProtoComponent
  ]
})

export class AppModule { }
