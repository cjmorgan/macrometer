import mongoose = require('mongoose');
import {IResponse} from './IResponse';
import {IFood, Food} from '../model/Food';

interface IFoodQuery {
  name?:string;
}

export interface IFoodResponse extends IFood, IResponse {}

export class FoodController {
  constructor() {}

  getFood(params:IFoodQuery, cb:Function ) {
    let q:IFoodQuery = {}

    if (params.name) {
      q.name = params.name;
    }

    Food.find(q, (err, data) => {
      let response = this.getFoodResponse(data);
      cb(err, response);
    });
  }

  addFood(params:IFood, cb:Function) {

    let f = new Food({
      name: params.name
    });

    f.save((err, data) => {
      let response = this.getFoodResponse([data]);
      cb(err, response);
    });
  }

  setFood(id:string, values:IFoodQuery, cb:Function) {
    let changed:boolean = false;
    console.log("values",values);
    Food.findById(id, (err, currentData) => {
      if (err) {
        cb(err, []);
      } else {
        for (let prop in values) {
          switch (prop) {
            case "name":
              currentData.name = values.name;
              changed = true;
              break;
          }
        }
        if (changed) {
          currentData.save((err, updatedData) => {
            let response = this.getFoodResponse([updatedData]);
            cb(err, response);
          });
        } else {
          let response = this.getFoodResponse([currentData]);
          cb("No data to change.", response);
        }
      }
    })
  }

  removeFood(id:string, cb:Function) {
    Food.findById(id, (err, data) => {
      if (err) {
        cb(err, []);
      } else {
        data.remove((err) => {
          if (err) {
            cb(err, []);
          } else {
            let response = this.getFoodResponse([data]);
            cb(err, response);
          }
        });
      }
    });
  }

  getFoodResponse(data:Array<any>):IFoodResponse[] {
    let response:IFoodResponse[] = [];

    for (let row of data) {
      response.push(row);
    }

    return response;
  }
}
