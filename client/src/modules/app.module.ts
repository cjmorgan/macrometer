import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { HeaderComponent }  from '../components/header.component';
import { MainComponent} from '../components/main.component';

import { IdService } from '../services/id.service';

import { routes } from '../routes/routes';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    HeaderComponent,
    MainComponent
  ],
  providers: [
    IdService
  ],
  bootstrap: [
    HeaderComponent,
    MainComponent
  ]
})

export class AppModule { }
