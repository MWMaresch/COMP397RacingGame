/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

module scenes {
    export class Instructions extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _returnBtn : objects.Button;        
        private _menuBG : createjs.Bitmap;

        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            console.log("Menu Scene Started");

            this._returnBtn = new objects.Button("ExitBtn", 200, 465, 177, 84);          
            this.addChild(this._returnBtn);
            this._returnBtn.on("click", this._returnBtnClick, this);

            this._menuBG = new createjs.Bitmap(assets.getResult("Instructions"));
            this.addChildAt(this._menuBG, 0);

            // Add menu scene to global stage container
            stage.addChild(this);
        }

        public update() : void {

        }

        private _returnBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}