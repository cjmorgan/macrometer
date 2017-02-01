import express = require('express');
import path = require('path');

import {Server} from '../Server';

export class Routes {

  static setRoutes(router:express.Router, app:express.Application, server:Server) {
    router.get('/api/id', (req:express.Request, res:express.Response) => {
      res.json({
        message: server.id
      });
    });

    router.get(['/', '/data', '/grid'], (req:Express.Request, res:express.Response) => {
      res.sendFile(path.join(__dirname, this.clientPath, 'index.html'))
    });


    app.use(router);
    app.use('/', express.static(path.join(__dirname, this.clientPath)));
  }

  private static clientPath:string = "../../client";

}
