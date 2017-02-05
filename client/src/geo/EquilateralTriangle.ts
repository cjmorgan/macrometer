export function deg2rad(deg:number):number {
  return deg * (Math.PI/180);
}

export function rad2deg(rad:number):number {
  return rad * (180/Math.PI);
}

export class Point {
  public x:number;
  public y:number;


  public offset(angle:number, distance:number):Point {
    angle = deg2rad(angle);
    let offsetX = this.x + (distance * Math.cos(angle));
    let offsetY = this.y + (distance * Math.sin(angle));

    return new Point({x:offsetX, y:offsetY});
  }

  public product(value:number):Point {
    return new Point({
      x: value*this.x,
      y: value*this.y
    });
  }

  public sum(point:Point):Point {
    return new Point({
      x: point.x + this.x,
      y: point.y + this.y
    });
  }

  constructor({x = 0, y = 0}:{x?:number, y?:number}) {
    this.x = x;
    this.y = y;
  }



}

export interface ICorners {
  a:Point,
  b:Point,
  c:Point
}

export class EquilateralTriange {
  get altitude():number {
    return (Math.sqrt(3)/2) * this.side;
  }

  get corners():ICorners {
    let dist = (2/3) * this.altitude;

    let corners:ICorners = {
      a: this.center.offset(-90, dist),
      b: this.center.offset(30, dist),
      c: this.center.offset(150, dist)
    }

    return corners;
  }

  //https://en.wikipedia.org/wiki/Trilinear_coordinates
  getPointForTrilinear(x:number, y:number, z:number):Point {
    let s = this.side;
    let corners = this.corners;

    let A = this.corners.a;
    let B = this.corners.b;
    let C = this.corners.c;

    let dividend = s*x+s*y+s*z;

    let pt1:Point = A.product((s*x)/dividend);
    let pt2:Point = B.product((s*y)/dividend);
    let pt3:Point = C.product((s*z)/dividend);

    return pt3.sum(pt2).sum(pt1);

  }

  public side:number;
  public center:Point;

  constructor({side = 1, x = 0, y = 0}:{side?:number, x?:number, y?:number}) {
    this.side = side;
    this.center = new Point({x: x, y:y});
  }
}
