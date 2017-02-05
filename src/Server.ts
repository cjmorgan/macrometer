
import express    = require('express');
import bodyParser = require('body-parser');
import path       = require('path');

import {Routes} from './routes/Routes';
import {Database} from './model/Database';

export class Server {

  version:String = "v0.0.1";
  identity:String = "Macrometer";


  constructor({port = 8080}: {port:number}) {

    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.router = express.Router();
    this.configureRoutes();

    this.app.listen(port);

    console.log(`${this.id} Server running on ${port}`);
  }

  get id():String {
    return `${this.identity} ${this.version}`;
  }

  private app:express.Application;
  private router:express.Router;

  private configureRoutes() {
    Routes.setRoutes(this.router, this.app, this);
  }

}
