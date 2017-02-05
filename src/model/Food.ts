import mongoose = require('mongoose');
import {Database} from './Database';

const db = Database.instance;

export interface IMacronutrients {
  carbohydrate:number;
  protein:number;
  fat:number;
}

export interface IFood {
  name:string;
  macros:IMacronutrients;
  ndbno:number;
}

interface IFoodModel extends IFood, mongoose.Document {}

const FoodSchema = new mongoose.Schema({
  name:String,
  macros: {
    carbohydrates:Number,
    protein:Number,
    fat:Number
  },
  ndbno:Number
});

export let Food = db.model<IFoodModel>("Food", FoodSchema);
