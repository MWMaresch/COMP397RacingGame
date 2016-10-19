var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Track = (function (_super) {
        __extends(Track, _super);
        function Track() {
            _super.call(this);
            this._timer = 0;
            this._finished = false;
        }
        Track.prototype.start = function () {
            //private vars
            this._totalLaps = numLaps;
            this._lapTimes = [0]; //may not implement
            this._curLap = 1;
            this._curCheckpoint = 0;
            this._bg = new createjs.Bitmap(assets.getResult("Track"));
            this.addChild(this._bg);
            //finish line & checkpoints
            this._finishLine = new objects.FinishLine(118, 315);
            this.addChild(this._finishLine);
            this._checkpoint1 = new objects.Checkpoint(880, 182);
            this.addChild(this._checkpoint1);
            this._checkpoint2 = new objects.Checkpoint(880, 440);
            this.addChild(this._checkpoint2);
            this._car = new objects.Player("redcar", 90, 365);
            this.addChild(this._car);
            //HUD
            this._lapDisplay = new objects.Label("Lap " + this._curLap.toString() + "/" + this._totalLaps.toString(), "50px Consolas", "#ffffff", 600, 80);
            this.addChild(this._lapDisplay);
            this._timeDisplay = new objects.Label("0", "50px Consolas", "#ffffff", 500, 30);
            this.addChild(this._timeDisplay);
            stage.addChild(this);
            canPause = true;
        };
        Track.prototype._updateLapDisplay = function () {
            this._lapDisplay.text = "Lap " + this._curLap.toString() + "/" + this._totalLaps.toString();
        };
        Track.prototype.update = function () {
            if (this._curLap <= this._totalLaps) {
                this._timer += createjs.Ticker.interval;
                this._timeDisplay.text = "Time: " + (Math.round(this._timer / 10) / 100).toString();
                // (Math.round(this._lapTimes[0]/10)/100).toString();
                if (this._curCheckpoint == 2 && collision.boxCheck(this._finishLine, this._car)) {
                    this._lapTimes[this._curLap - 1] = this._timer;
                    this._curLap++;
                    this._updateLapDisplay();
                    this._curCheckpoint = 0;
                }
                if (collision.boxCheck(this._checkpoint1, this._car)) {
                    this._curCheckpoint = 1;
                }
                if (collision.boxCheck(this._checkpoint2, this._car) && this._curCheckpoint == 1) {
                    this._curCheckpoint = 2;
                }
                this._car.update();
            }
            else if (!this._finished) {
                canPause = false;
                console.log("all laps finished");
                this._finished = true;
                this._bg = new createjs.Bitmap(assets.getResult("Overlay"));
                this.addChild(this._bg);
                this._returnBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, 465, 177, 84);
                this.addChild(this._returnBtn);
                this._returnBtn.on("click", this._returnBtnClick, this);
                var plural = "";
                if (this._totalLaps > 1) {
                    plural = "s";
                }
                this.removeChild(this._lapDisplay);
                this._lapDisplay = new objects.Label("Finished " + this._totalLaps.toString() + " Lap" + plural, "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y);
                this.addChild(this._lapDisplay);
                this.removeChild(this._timeDisplay);
                this._timeDisplay = new objects.Label("in " + (Math.round(this._timer / 10) / 100).toString() + " seconds", "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y + 50);
                this.addChild(this._timeDisplay);
            }
        };
        Track.prototype._returnBtnClick = function (event) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        };
        return Track;
    }(objects.Scene));
    scenes.Track = Track;
})(scenes || (scenes = {}));
//# sourceMappingURL=track.js.map