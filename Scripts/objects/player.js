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
            this._acceleration = 0.6;
            this._friction = 0.9;
            this._turnAccel = 0.5;
            this._turnFriction = 0.9;
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
            this._velX = 30 / (this.position.x - theirX);
            this._velY = 30 / (this.position.y - theirY);
        };
        Player.prototype.update = function () {
            _super.prototype.update.call(this);
            if (controls.P1UP) {
                this.moveForward();
            }
            if (controls.P1DOWN) {
                this.brake();
            }
            if (controls.P1RIGHT) {
                this.turnLeft();
            }
            if (controls.P1LEFT) {
                this.turnRight();
            }
            this.updateMovement();
        };
        Player.prototype.updateMovement = function () {
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
        };
        Player.prototype.moveForward = function () {
            this._velX += this._acceleration * Math.cos((this.rotation - 90) * Math.PI / 180);
            this._velY += this._acceleration * Math.sin((this.rotation - 90) * Math.PI / 180);
        };
        Player.prototype.brake = function () {
            this._velX -= this._acceleration * Math.cos((this.rotation - 90) * Math.PI / 180);
            this._velY -= this._acceleration * Math.sin((this.rotation - 90) * Math.PI / 180);
        };
        Player.prototype.turnRight = function () {
            this._curTurnSpeed -= this._turnAccel;
        };
        Player.prototype.turnLeft = function () {
            this._curTurnSpeed += this._turnAccel;
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