var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Player2 = (function (_super) {
        __extends(Player2, _super);
        function Player2(imageString, x, y) {
            _super.call(this, imageString, x, y);
        }
        Player2.prototype.update = function () {
            this.x = this.position.x;
            this.y = this.position.y;
            if (controls.P2UP) {
                this.moveForward();
            }
            if (controls.P2DOWN) {
                this.brake();
            }
            if (controls.P2RIGHT) {
                this.turnLeft();
            }
            if (controls.P2LEFT) {
                this.turnRight();
            }
            this.updateMovement();
        };
        return Player2;
    }(objects.Player));
    objects.Player2 = Player2;
})(objects || (objects = {}));
//# sourceMappingURL=player2.js.map