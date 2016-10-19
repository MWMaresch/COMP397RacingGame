module scenes {
    export class Shooter extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _ship : objects.Player;
        private _enemy : objects.Enemy;

        constructor() {
            super();
        }

        public start() : void {
            this._bg = new createjs.Bitmap(assets.getResult("Space_BG"));
            this.addChild(this._bg);

            this._ship = new objects.Player("car");
            this.addChild(this._ship);

            this._enemy = new objects.Enemy("enemy");
            this.addChild(this._enemy);

            stage.addChild(this);
        }

        public update() : void {
            // Check collisions
            for(let i of this._ship.getShots) {
                collision.check(i, this._enemy);
            }

            this._ship.update();
            this._enemy.update();
        }
    }
}