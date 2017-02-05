import express = require('express');
import path = require('path');

import {Server} from '../Server';
import {IFood} from '../model/Food';
import {IFoodResponse, FoodController} from '../controllers/FoodController';

export class Routes {

  static setRoutes(router:express.Router, app:express.Application, server:Server) {

    router.get('/api/id', (req:express.Request, res:express.Response) => {
      res.json({
        message: server.id
      });
    });

    router.get('/api/food', (req:express.Request, res:express.Response) => {
      let f = new FoodController();
      f.getFood(req.params, (err:any, data:IFoodResponse[]) => {
        Routes.handleResponse(err, data, res);
      });
    });

    // router.put('/api/food/:name', (req:express.Request, res:express.Response) => {
    //   let f = new FoodController();
    //   f.addFood(req.params, (err:any, data:IFoodResponse[]) => {
    //     Routes.handleResponse(err, data, res);
    //   })
    // });

    // router.post('/api/food/:id', (req:express.Request, res:express.Response) => {
    //   let f = new FoodController();
    //   f.setFood(req.params.id, req.body, (err:any, data:IFoodResponse[]) => {
    //     Routes.handleResponse(err, data, res);
    //   })
    // });
    //
    // router.delete('/api/food/:id', (req:express.Request, res:express.Response) => {
    //   let f = new FoodController();
    //   f.removeFood(req.params.id, (err:any, data:IFoodResponse[]) => {
    //     Routes.handleResponse(err, data, res);
    //   });
    // });

    router.get(['/', '/data', '/grid'], (req:Express.Request, res:express.Response) => {
      res.sendFile(path.join(__dirname, this.clientPath, 'index.html'))
    });

    app.use(router);
    app.use('/', express.static(path.join(__dirname, this.clientPath)));
  }

  static handleResponse(err:any, data:Array<any>, res:express.Response) {
    if (err) {
      Routes.handleError(err, res);
    } else {
      res.json({
        status: true,
        data: data
      });
    }
  }

  static handleError(err:any, res:express.Response) {
    console.error(err);
    res.json({
      status:false
    })
  }

  private static clientPath:string = "../../client";

}
