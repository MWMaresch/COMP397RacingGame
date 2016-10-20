module objects {
    export class Player2 extends objects.Player {

        constructor(imageString:string, x:number, y:number) {
            super(imageString, x,y);
        }

        public update() : void {

            this.updateSuper();

            //the only difference between players is what keys are used to control the vehicle
            if(controls.P2UP) 
                this.moveForward();
                
            if(controls.P2DOWN) 
                this.brake();

            if(controls.P2RIGHT) 
                this.turnLeft();

            if(controls.P2LEFT) 
                this.turnRight();
            
            this.checkBoundaries();
            this.updateMovement();
        }
    }
}