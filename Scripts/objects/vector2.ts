module objects {
    export class Vector2 extends createjs.Point {
        constructor(x:number = 0, y:number = 0) {
            super(x,y);
        }


        // Standard distance formula between 2 points
        public static distance(a: Vector2, b:Vector2) : number {
            return Math.sqrt(Math.pow((b.x - a.x),2 + Math.pow((b.y - a.y), 2)));
        }
    } 
}