/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        // Menu Class Contructor
        function Instructions() {
            _super.call(this);
        }
        Instructions.prototype.start = function () {
            console.log("Menu Scene Started");
            this._returnBtn = new objects.Button("ExitBtn", 200, 465, 177, 84);
            this.addChild(this._returnBtn);
            this._returnBtn.on("click", this._returnBtnClick, this);
            this._menuBG = new createjs.Bitmap(assets.getResult("Instructions"));
            this.addChildAt(this._menuBG, 0);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Instructions.prototype.update = function () {
        };
        Instructions.prototype._returnBtnClick = function (event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map