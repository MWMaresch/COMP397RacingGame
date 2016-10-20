var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(imageString, x, y) {
            _super.call(this, imageString, "");
            //constant variables
            //if only the const or readonly keywords could be used here
            this._ACCELERATION = 0.67;
            this._DEFAULT_FRICTION = 1.12;
            this._TURN_ACCEL = 0.6;
            this._TURN_FRICTION = 1.2;
            this._GRASS_FRICTION = 1.4;
            //other variables
            this._curFriction = 0;
            this._curTurnSpeed = 0;
            this._velX = 0;
            this._velY = 0;
            this.position.x = x;
            this.position.y = y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
        }
        Player.prototype.bump = function (theirX, theirY) {
            this._velX = (this.position.x - theirX) / 10;
            this._velY = (this.position.y - theirY) / 10;
        };
        //this exists so that p2 can call gameObject.update()
        Player.prototype.updateSuper = function () {
            _super.prototype.update.call(this);
        };
        Player.prototype.update = function () {
            _super.prototype.update.call(this);
            if (controls.P1UP)
                this.moveForward();
            if (controls.P1DOWN)
                this.brake();
            if (controls.P1RIGHT)
                this.turnLeft();
            if (controls.P1LEFT)
                this.turnRight();
            this.checkBoundaries();
            this.updateMovement();
        };
        Player.prototype.checkBoundaries = function () {
            //if we try to go off any edge of the stage, act as if we hit a wall
            if (this.position.x > config.Screen.WIDTH)
                this.bump(this.position.x + 50, this.position.y);
            else if (this.position.x < 0)
                this.bump(this.position.x - 50, this.position.y);
            else if (this.position.y > config.Screen.HEIGHT)
                this.bump(this.position.x, this.position.y + 50);
            else if (this.position.y < 0)
                this.bump(this.position.x, this.position.y - 50);
        };
        Player.prototype.updateMovement = function () {
            //adjust friction depending on what surface we're on
            this._pixelData = getPixel(this.position.x, this.position.y).data;
            //if the green value beneath us is >= 150 and the red value is <= 0 then we're certainly on grass
            if (this._pixelData[1] >= 150 && this._pixelData[0] <= 0)
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
        };
        Player.prototype.moveForward = function () {
            //go forward depending on rotation
            //subtract 90 degrees because the sprite faces upwards, not to the right
            this._velX += this._ACCELERATION * Math.cos((this.rotation - 90) * Math.PI / 180);
            this._velY += this._ACCELERATION * Math.sin((this.rotation - 90) * Math.PI / 180);
        };
        Player.prototype.brake = function () {
            //same as above, but subtracting instead of adding
            this._velX -= this._ACCELERATION * Math.cos((this.rotation - 90) * Math.PI / 180);
            this._velY -= this._ACCELERATION * Math.sin((this.rotation - 90) * Math.PI / 180);
        };
        Player.prototype.turnRight = function () {
            this._curTurnSpeed -= this._TURN_ACCEL;
        };
        Player.prototype.turnLeft = function () {
            this._curTurnSpeed += this._TURN_ACCEL;
        };
        Player.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
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
        };
        Player.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
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
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map