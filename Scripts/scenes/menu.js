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
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // Menu Class Contructor
        function Menu() {
            _super.call(this);
        }
        Menu.prototype.start = function () {
            console.log("Menu Scene Started");
            this._1pBtn = new objects.Button("TimAtBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 140, 300, 68);
            this.addChild(this._1pBtn);
            this._1pBtn.on("click", this._playBtnClick, this);
            this._1p1lBtn = new objects.Button("LapBtn", config.Screen.CENTER_X + 300, config.Screen.CENTER_Y + 140, 300, 68);
            this.addChild(this._1p1lBtn);
            this._1p1lBtn.on("click", this._play1lBtnClick, this);
            this._2pBtn = new objects.Button("2PBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 220, 300, 68);
            this.addChild(this._2pBtn);
            this._2pBtn.on("click", this._2playBtnClick, this);
            this._2p1lBtn = new objects.Button("LapBtn", config.Screen.CENTER_X + 300, config.Screen.CENTER_Y + 220, 300, 68);
            this.addChild(this._2p1lBtn);
            this._2p1lBtn.on("click", this._2play1lBtnClick, this);
            this._instBtn = new objects.Button("InstBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 300, 300, 68);
            this.addChild(this._instBtn);
            this._instBtn.on("click", this._instBtnClick, this);
            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            // this.addChild(this._menuBG);
            this.addChildAt(this._menuBG, 0);
            // Add menu scene to global stage container
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        Menu.prototype._playBtnClick = function (event) {
            numLaps = 3;
            this.removeAllChildren();
            scene = config.Scene.SINGLEPLAYER;
            changeScene();
        };
        Menu.prototype._2playBtnClick = function (event) {
            numLaps = 3;
            this.removeAllChildren();
            scene = config.Scene.MULTIPLAYER;
            changeScene();
        };
        Menu.prototype._play1lBtnClick = function (event) {
            numLaps = 1;
            this.removeAllChildren();
            scene = config.Scene.SINGLEPLAYER;
            changeScene();
        };
        Menu.prototype._2play1lBtnClick = function (event) {
            numLaps = 1;
            this.removeAllChildren();
            scene = config.Scene.MULTIPLAYER;
            changeScene();
        };
        Menu.prototype._instBtnClick = function (event) {
            this.removeAllChildren();
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        };
        return Menu;
    }(objects.Scene));
    scenes.Menu = Menu;
})(scenes || (scenes = {}));
//# sourceMappingURL=menu.js.map