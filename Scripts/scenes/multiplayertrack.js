var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var MultiplayerTrack = (function (_super) {
        __extends(MultiplayerTrack, _super);
        function MultiplayerTrack() {
            _super.call(this);
            this._timer = 0;
            this._finished = false;
        }
        MultiplayerTrack.prototype.start = function () {
            //private vars
            this._totalLaps = numLaps;
            this._p1curLap = 1;
            this._p1curCheckpoint = 0;
            this._p2curLap = 1;
            this._p2curCheckpoint = 0;
            this._bg = new createjs.Bitmap(assets.getResult("Track"));
            this.addChild(this._bg);
            //finish line & checkpoints
            this._finishLine = new objects.FinishLine(118, 315);
            this.addChild(this._finishLine);
            this._checkpoint1 = new objects.Checkpoint(880, 182);
            this.addChild(this._checkpoint1);
            this._checkpoint2 = new objects.Checkpoint(880, 440);
            this.addChild(this._checkpoint2);
            this._p1car = new objects.Player("redcar", 90, 365);
            this._p2car = new objects.Player2("bluecar", 130, 365);
            this.addChild(this._p1car);
            this.addChild(this._p2car);
            //HUD
            this._p1lapDisplay = new objects.Label("P1 Lap " + this._p1curLap.toString() + "/" + this._totalLaps.toString(), "30px Consolas", "#ffffff", 600, 80);
            this.addChild(this._p1lapDisplay);
            this._p2lapDisplay = new objects.Label("P2 Lap " + this._p1curLap.toString() + "/" + this._totalLaps.toString(), "30px Consolas", "#ffffff", 600, 110);
            this.addChild(this._p2lapDisplay);
            this._timeDisplay = new objects.Label("0", "50px Consolas", "#ffffff", 500, 30);
            this.addChild(this._timeDisplay);
            stage.addChild(this);
            canPause = true;
        };
        MultiplayerTrack.prototype._updateLapDisplay = function () {
            //we want to display what lap the leader is on
            this._p1lapDisplay.text = "P1 Lap " + this._p1curLap.toString() + "/" + this._totalLaps.toString();
            this._p2lapDisplay.text = "P2 Lap " + this._p2curLap.toString() + "/" + this._totalLaps.toString();
        };
        MultiplayerTrack.prototype._checkPlayerCollisions = function () {
            //Player1
            //check collision over finish line
            if (this._p1curCheckpoint == 2 && collision.boxCheck(this._finishLine, this._p1car)) {
                this._p1curLap++;
                this._updateLapDisplay();
                this._p1curCheckpoint = 0;
            }
            //checkpoints
            if (collision.boxCheck(this._checkpoint1, this._p1car)) {
                this._p1curCheckpoint = 1;
            }
            if (collision.boxCheck(this._checkpoint2, this._p1car) && this._p1curCheckpoint == 1) {
                this._p1curCheckpoint = 2;
            }
            //Player2
            if (this._p2curCheckpoint == 2 && collision.boxCheck(this._finishLine, this._p2car)) {
                this._p2curLap++;
                this._updateLapDisplay();
                this._p2curCheckpoint = 0;
            }
            if (collision.boxCheck(this._checkpoint2, this._p2car)) {
                this._p2curCheckpoint = 1;
            }
            if (collision.boxCheck(this._checkpoint2, this._p2car) && this._p2curCheckpoint == 1) {
                this._p2curCheckpoint = 2;
            }
            if (collision.circleCheck(this._p1car, this._p2car)) {
                this._p1car.bump(this._p2car.position.x, this._p2car.position.y);
                this._p2car.bump(this._p1car.position.x, this._p1car.position.y);
            }
        };
        MultiplayerTrack.prototype.update = function () {
            if (this._p1curLap <= this._totalLaps && this._p2curLap <= this._totalLaps) {
                this._timer += createjs.Ticker.interval;
                this._timeDisplay.text = "Time: " + (Math.round(this._timer / 10) / 100).toString();
                this._checkPlayerCollisions();
                this._p1car.update();
                this._p2car.update();
            }
            else if (!this._finished) {
                var winner;
                canPause = false;
                console.log("all laps finished");
                this._finished = true;
                this._bg = new createjs.Bitmap(assets.getResult("Overlay"));
                this.addChild(this._bg);
                this._returnBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, 465, 177, 84);
                this.addChild(this._returnBtn);
                this._returnBtn.on("click", this._returnBtnClick, this);
                if (this._p1curLap > this._p2curLap)
                    winner = "Player 1";
                else
                    winner = "Player 2";
                this.removeChild(this._p1lapDisplay);
                this.removeChild(this._p2lapDisplay);
                var plural = "";
                if (this._totalLaps > 1) {
                    plural = "s";
                }
                this._p1lapDisplay = new objects.Label(winner + " Wins!\n\nFinished " + this._totalLaps.toString() + " Lap" + plural, "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y);
                this.addChild(this._p1lapDisplay);
                this.removeChild(this._timeDisplay);
                this._timeDisplay = new objects.Label("in " + (Math.round(this._timer / 10) / 100).toString() + " seconds", "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100);
                this.addChild(this._timeDisplay);
            }
        };
        MultiplayerTrack.prototype._returnBtnClick = function (event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        };
        return MultiplayerTrack;
    }(objects.Scene));
    scenes.MultiplayerTrack = MultiplayerTrack;
})(scenes || (scenes = {}));
//# sourceMappingURL=multiplayertrack.js.map