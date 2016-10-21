module objects {
    export class Player extends objects.GameObject {

        private _keyPressed : number;

        //constant variables
        //if only the const or readonly keywords could be used here
        private _ACCELERATION : number = 0.72;
        private _DEFAULT_FRICTION : number = 1.12;
        private _TURN_ACCEL : number = 0.6;
        private _TURN_FRICTION : number = 1.2;
        private _GRASS_FRICTION : number = 1.4;

        //other variables
        private _curFriction : number = 0;
        private _curTurnSpeed : number = 0;
        private _velX : number = 0;
        private _velY : number = 0;

        protected _pixelData : Uint8ClampedArray;

        constructor(imageString:string, x:number, y:number) {
            super(imageString, "");
            this.position.x = x;
            this.position.y = y;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
        }

        public bump(theirX:number,theirY:number) : void{
            this._velX = (this.position.x - theirX)/ 10;
            this._velY = (this.position.y - theirY) / 10;
        }

        //this exists so that p2 can call gameObject.update()
        protected updateSuper() : void {
            super.update();
        }

        public update() : void {

            super.update();
            
            if(controls.P1UP) 
                this.moveForward();      
                      
            if(controls.P1DOWN) 
                this.brake();

            if(controls.P1RIGHT) 
                this.turnLeft();

            if(controls.P1LEFT) 
                this.turnRight();

            this.checkBoundaries();
            this.updateMovement();
        }

        protected checkBoundaries(){
            //if we try to go off any edge of the stage, act as if we hit a wall
            if (this.position.x > config.Screen.WIDTH)            
                this.bump (this.position.x + 50, this.position.y)

            else if (this.position.x < 0)
                this.bump (this.position.x - 50, this.position.y)

            else if (this.position.y > config.Screen.HEIGHT)
                this.bump (this.position.x, this.position.y + 50)

            else if (this.position.y < 0)
                this.bump (this.position.x, this.position.y - 50)
            
        }

        protected updateMovement(){
            //adjust friction depending on what surface we're on
            this._pixelData = getPixel(this.position.x, this.position.y).data;
            //if the green value beneath us is >= 150 and the red value is <= 0 then we're certainly on grass
            if (this._pixelData[1] >= 100 && this._pixelData[0] <= 50)
                this._curFriction = this._GRASS_FRICTION;
            else
                this._curFriction = this._DEFAULT_FRICTION;

            //smooth acceleration + momentum based movement and turning
            this._curTurnSpeed /= this._TURN_FRICTION;
            this.rotation += this._curTurnSpeed;

            this._velX /= this._curFriction;
            this._velY /= this._curFriction;
            this.position.x += this._velX;
            this.position.y += this._velY;
        }

        public moveForward() {
            //go forward depending on rotation
            //subtract 90 degrees because the sprite faces upwards, not to the right
            this._velX += this._ACCELERATION * Math.cos((this.rotation-90) * Math.PI / 180);
            this._velY += this._ACCELERATION * Math.sin((this.rotation-90) * Math.PI / 180);
        }

        public brake() {
            //same as above, but subtracting instead of adding
            this._velX -= this._ACCELERATION * Math.cos((this.rotation-90) * Math.PI / 180);
            this._velY -= this._ACCELERATION * Math.sin((this.rotation-90) * Math.PI / 180);
        }

        public turnRight() {
            this._curTurnSpeed -= this._TURN_ACCEL;
        }

        public turnLeft() {
            this._curTurnSpeed += this._TURN_ACCEL;
        }

        private _onKeyDown(event : KeyboardEvent) {
            switch(event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.P1UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.P1DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.P1LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.P1RIGHT = true;
                    break;
                case keys.ESC:
                    console.log("ESC key pressed");
                    togglePause();
                    break;
                case keys.UP:
                    console.log("up key pressed");
                    controls.P2UP = true;
                    break;
                case keys.DOWN:
                    console.log("down key pressed");
                    controls.P2DOWN = true;
                    break;
                case keys.LEFT:
                    console.log("left key pressed");
                    controls.P2LEFT = true;
                    break;
                case keys.RIGHT:
                    console.log("right key pressed");
                    controls.P2RIGHT = true;
                    break;
            }
        }

        private _onKeyUp(event : KeyboardEvent) {
             switch(event.keyCode) {
                case keys.W:
                    controls.P1UP = false;
                    break;
                case keys.S:
                    controls.P1DOWN = false;
                    break;
                case keys.A:
                    controls.P1LEFT = false;
                    break;
                case keys.D:
                    controls.P1RIGHT = false;
                    break;
                case keys.UP:
                    controls.P2UP = false;
                    break;
                case keys.DOWN:
                    controls.P2DOWN = false;
                    break;
                case keys.LEFT:
                    controls.P2LEFT = false;
                    break;
                case keys.RIGHT:
                    controls.P2RIGHT = false;
                    break;
            }
        }
    }
}