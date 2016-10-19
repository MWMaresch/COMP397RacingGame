var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Checkpoint = (function (_super) {
        __extends(Checkpoint, _super);
        function Checkpoint(x, y) {
            _super.call(this, "finishline", "");
            this.visible = false;
            this.x = x;
            this.y = y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
        }
        Checkpoint.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return Checkpoint;
    }(objects.GameObject));
    objects.Checkpoint = Checkpoint;
})(objects || (objects = {}));
//# sourceMappingURL=checkpoint.js.map