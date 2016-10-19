module objects {
    export class Player2 extends objects.Player {

        constructor(imageString:string, x:number, y:number) {
            super(imageString, x,y);
        }

        public update() : void {

            this.x = this.position.x;
            this.y = this.position.y;

            if(controls.P2UP) {
                this.moveForward();
            }
            
            if(controls.P2DOWN) {
                this.brake();
            }

            if(controls.P2RIGHT) {
                this.turnLeft();
            }

            if(controls.P2LEFT) {
                this.turnRight();
            }
            this.updateMovement();
        }
    }
}