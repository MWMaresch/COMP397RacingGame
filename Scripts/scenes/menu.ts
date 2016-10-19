/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Menu extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _1pBtn : objects.Button;
        private _2pBtn : objects.Button;      
        private _1p1lBtn : objects.Button;
        private _2p1lBtn : objects.Button;      
        private _instBtn : objects.Button;        
        private _menuBG : createjs.Bitmap;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");

            this._1pBtn = new objects.Button("TimAtBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 140,300,68);
            this.addChild(this._1pBtn);
            this._1pBtn.on("click", this._playBtnClick, this);

            this._1p1lBtn = new objects.Button("LapBtn", config.Screen.CENTER_X + 300, config.Screen.CENTER_Y + 140,300,68);
            this.addChild(this._1p1lBtn);
            this._1p1lBtn.on("click", this._play1lBtnClick, this);

            this._2pBtn = new objects.Button("2PBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 220,300,68);
            this.addChild(this._2pBtn);
            this._2pBtn.on("click", this._2playBtnClick, this);

            this._2p1lBtn = new objects.Button("LapBtn", config.Screen.CENTER_X + 300, config.Screen.CENTER_Y + 220,300,68);
            this.addChild(this._2p1lBtn);
            this._2p1lBtn.on("click", this._2play1lBtnClick, this);

            this._instBtn = new objects.Button("InstBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 300,300,68);
            this.addChild(this._instBtn);
            this._instBtn.on("click", this._instBtnClick, this);

            this._menuBG = new createjs.Bitmap(assets.getResult("Menu_BG"));
            // this.addChild(this._menuBG);

            this.addChildAt(this._menuBG, 0);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

        private _playBtnClick(event : createjs.MouseEvent) {
            numLaps = 3;
            this.removeAllChildren();
            scene = config.Scene.SINGLEPLAYER;
            changeScene();
        }

        private _2playBtnClick(event : createjs.MouseEvent) {
            numLaps = 3;
            this.removeAllChildren();
            scene = config.Scene.MULTIPLAYER;
            changeScene();   
        }

        private _play1lBtnClick(event : createjs.MouseEvent) {
            numLaps = 1;
            this.removeAllChildren();
            scene = config.Scene.SINGLEPLAYER;
            changeScene();
        }

        private _2play1lBtnClick(event : createjs.MouseEvent) {
            numLaps = 1;
            this.removeAllChildren();
            scene = config.Scene.MULTIPLAYER;
            changeScene();   
        }

        private _instBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.INSTRUCTIONS;
            changeScene();
        }
    }
}