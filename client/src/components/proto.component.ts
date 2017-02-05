import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { IMacronutrients } from '../../../src/model/Food';
import d3 = require('d3');
import { Point, EquilateralTriange } from '../geo/EquilateralTriangle';

export class Nutrients implements IMacronutrients {

  public protein:number;
  public carbohydrate:number;
  public fat:number;
  public usdaData:any;

  get calories():IMacronutrients {
    return {
      protein: this.protein*4,
      carbohydrate: this.carbohydrate*4,
      fat: this.fat*9
    }
  }

  get portions():IMacronutrients {
    let calories = this.calories;
    let sum = calories.protein + calories.carbohydrate + calories.fat;

    return {
      protein: calories.protein/sum,
      carbohydrate: calories.carbohydrate/sum,
      fat: calories.fat/sum
    }

  }

  getNutrient(key:String):number {
    let nutrients = this.usdaData.foods[0].food.nutrients;

    for (let i = 0, len = nutrients.length; i<len;i++) {
      let curr = nutrients[i];
      if (curr.name.toLowerCase().indexOf(key.toLowerCase()) != -1)  {
        return parseInt(curr.value);
      }
    }

    return 0;
  }

  constructor({protein = 0, carbohydrate = 0, fat = 0, usdaData = null}:{protein?:number, carbohydrate?:number, fat?:number, usdaData?:number}) {
    if (usdaData) {
      this.usdaData = usdaData;
      this.protein = this.getNutrient('protein');
      this.carbohydrate = this.getNutrient('carbohydrate');
      this.fat = this.getNutrient('fat');
    } else {
      this.protein = protein;
      this.carbohydrate = carbohydrate;
      this.fat = fat;
    }
  }

}

@Component({
  selector: 'proto',
  templateUrl: 'views/proto.html'
})

export class ProtoComponent implements OnInit {

  public protein:number = 0;
  public carbohydrate:number =0;
  public fat:number = 0;

  constructor( private _foodService:FoodService ) {}


  private _food:Nutrients;
  private _triWidth:number = 300;
  private _triPadding:number = 40;

  private rootEl:any;

  ngOnInit() {
    this._foodService.getFood().then((data) => {
      this._food = new Nutrients({usdaData: data});
      console.log("food",this._food);
      this.protein = this._food.protein;
      this.carbohydrate = this._food.carbohydrate;
      this.fat = this._food.fat;
      this.drawViz();
    });
  }

  drawViz() {
    console.log("draw viz");

    let tri = new EquilateralTriange({side: this._triWidth});

    let width = tri.side + this._triPadding*2;
    let height = tri.altitude + this._triPadding*2;

    this.rootEl = d3.select('#nutrients')
      .attr('width', width)
      .attr('height', height);

    tri.center = new Point({x: width/2, y: tri.altitude*(2/3)+this._triPadding * .75});

    let triPoints = tri.corners;

    let portions = this._food.portions;
    let measuredPt = tri.getPointForTrilinear(portions.protein, portions.carbohydrate, portions.fat);

    this.drawTriangle(triPoints.b, triPoints.c, measuredPt, 'protein');
    this.drawTriangle(triPoints.c, triPoints.a, measuredPt, 'carbohydrate');
    this.drawTriangle(triPoints.a, triPoints.b, measuredPt, 'fat');

    this.drawPoint(measuredPt, 5, '#fff');
    this.drawLabel("C", width * .25, height * .5 - this._triPadding *.25, 'carbohydrate');
    this.drawLabel("F", width * .75, height * .5 - this._triPadding *.25, 'fat');
    this.drawLabel("P", width * .5, height - 10 - this._triPadding *.25, 'protein');
  }

  getSVGPoints(a:Point, b:Point, c:Point):string {
    return `${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`
  }

  drawTriangle(ptA:Point, ptB:Point, ptC:Point, classes:string = "") {
    let poly = this.rootEl.append('polygon')
      .attr('points', this.getSVGPoints(ptA, ptB, ptC));

    if (classes.length > 0) {
      poly.attr('class', classes);
    }
  }

  drawPoint(pt:Point, size:number, color:string) {
    this.rootEl.append('circle')
      .attr('cx', pt.x)
      .attr('cy', pt.y)
      .attr('r', size)
      .attr('class', 'point');
  }

  drawLabel(text:string, x:number, y:number, classes:string) {
    this.rootEl.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('class', classes)
      .text(text);
  }

}
