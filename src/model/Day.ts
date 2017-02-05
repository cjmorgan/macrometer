import mongoose = require('mongoose');
import {Database} from './Database';
import {IFood, IMacronutrients} from './Food';

const db = Database.instance;

export interface IEntry {
  eaten:boolean;
  foodType:IFood;
}

export interface IMeal {
  name:string;
  entries:IEntry[];
}

export interface IDay {
  date:Date;
  meals:IMeal[];
  calories:number;
  macros:IMacronutrients;
}

interface IDayModel extends IDay, mongoose.Document {}

const DaySchema = new mongoose.Schema({
  date:Date,
  meals:[{
    name:String,
    entries:[{
      eaten:Boolean,
      foodType: {type: mongoose.Schema.Types.ObjectId, ref: 'Food'}
    }]
  }]
});

export let Day = db.model<IDayModel>("Day", DaySchema);
