var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var FinishLine = (function (_super) {
        __extends(FinishLine, _super);
        function FinishLine(x, y) {
            _super.call(this, "finishline", "");
            this.x = x;
            this.y = y;
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
        }
        FinishLine.prototype.update = function () {
            _super.prototype.update.call(this);
        };
        return FinishLine;
    }(objects.GameObject));
    objects.FinishLine = FinishLine;
})(objects || (objects = {}));
//# sourceMappingURL=finishline.js.map