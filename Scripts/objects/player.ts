module objects {
    export class Player extends objects.GameObject {

        private _keyPressed : number;
        private _acceleration : number = 0.6;
        private _friction : number = 0.9;

        private _turnAccel : number = 0.5;
        private _turnFriction : number = 0.9;
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
            this._velX = 30 / (this.position.x - theirX);
            this._velY = 30 / (this.position.y - theirY);
        }

        public update() : void {

            super.update();
            
            if(controls.P1UP) {
                this.moveForward();
            }
            
            if(controls.P1DOWN) {
                this.brake();
            }

            if(controls.P1RIGHT) {
                this.turnLeft();
            }

            if(controls.P1LEFT) {
                this.turnRight();
            }
            this.updateMovement();
        }

        protected updateMovement(){
            this._pixelData = getPixel(this.x, this.y).data;
            if (this._pixelData[1] >= 150 && this._pixelData[0] <= 0)
                this._friction = 0.7;
            else
                this._friction = 0.91;


            this._velX *= this._friction;
            this._velY *= this._friction;
            this._curTurnSpeed *= this._turnFriction;

            this.rotation += this._curTurnSpeed;
            this.position.x += this._velX;
            this.position.y += this._velY;
        }


        public moveForward() {
            this._velX += this._acceleration * Math.cos((this.rotation-90) * Math.PI / 180);
            this._velY += this._acceleration * Math.sin((this.rotation-90) * Math.PI / 180);
        }

        public brake() {
            this._velX -= this._acceleration * Math.cos((this.rotation-90) * Math.PI / 180);
            this._velY -= this._acceleration * Math.sin((this.rotation-90) * Math.PI / 180);
        }

        public turnRight() {
            this._curTurnSpeed -= this._turnAccel;
        }

        public turnLeft() {
            this._curTurnSpeed += this._turnAccel;
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