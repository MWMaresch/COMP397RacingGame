var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Shooter = (function (_super) {
        __extends(Shooter, _super);
        function Shooter() {
            _super.call(this);
        }
        Shooter.prototype.start = function () {
            this._bg = new createjs.Bitmap(assets.getResult("Space_BG"));
            this.addChild(this._bg);
            this._ship = new objects.Player("car");
            this.addChild(this._ship);
            this._enemy = new objects.Enemy("enemy");
            this.addChild(this._enemy);
            stage.addChild(this);
        };
        Shooter.prototype.update = function () {
            // Check collisions
            for (var _i = 0, _a = this._ship.getShots; _i < _a.length; _i++) {
                var i = _a[_i];
                collision.check(i, this._enemy);
            }
            this._ship.update();
            this._enemy.update();
        };
        return Shooter;
    }(objects.Scene));
    scenes.Shooter = Shooter;
})(scenes || (scenes = {}));
//# sourceMappingURL=shooter.js.map