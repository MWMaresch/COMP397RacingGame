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
        }
        Track.prototype.start = function () {
            //initialize private variables
            this._curLap = 1;
            this._curCheckpoint = 0;
            this._timer = 0;
            this._finished = false;
            this._TOTAL_LAPS = numLaps;
            //add the background first so it's behind everything
            this._bg = new createjs.Bitmap(assets.getResult("Track"));
            this.addChild(this._bg);
            //finish line & checkpoints
            this._finishLine = new objects.FinishLine(118, 315);
            this.addChild(this._finishLine);
            this._checkpoint1 = new objects.Checkpoint(880, 182);
            this.addChild(this._checkpoint1);
            this._checkpoint2 = new objects.Checkpoint(880, 440);
            this.addChild(this._checkpoint2);
            //the player's vehicle
            this._car = new objects.Player("redcar", 90, 365);
            this.addChild(this._car);
            //HUD
            this._lapDisplay = new objects.Label("Lap " + this._curLap.toString() + "/" + this._TOTAL_LAPS.toString(), "50px Consolas", "#ffffff", 600, 80);
            this.addChild(this._lapDisplay);
            this._timeDisplay = new objects.Label("0", "50px Consolas", "#ffffff", 500, 30);
            this.addChild(this._timeDisplay);
            stage.addChild(this);
            canPause = true;
        };
        Track.prototype._updateLapDisplay = function () {
            this._lapDisplay.text = "Lap " + this._curLap.toString() + "/" + this._TOTAL_LAPS.toString();
        };
        Track.prototype.update = function () {
            //as long as we're not finished the race:
            if (this._curLap <= this._TOTAL_LAPS) {
                this._timer += createjs.Ticker.interval;
                this._timeDisplay.text = "Time: " + (Math.round(this._timer / 10) / 100).toString();
                //we only want to let the lap counter increase if they actually went through the whole track
                if (this._curCheckpoint == 2 && collision.boxCheck(this._finishLine, this._car)) {
                    this._curLap++;
                    this._updateLapDisplay();
                    this._curCheckpoint = 0;
                }
                else if (collision.boxCheck(this._checkpoint1, this._car))
                    this._curCheckpoint = 1;
                else if (collision.boxCheck(this._checkpoint2, this._car) && this._curCheckpoint == 1)
                    this._curCheckpoint = 2;
                this._car.update();
            }
            else if (!this._finished) {
                //the only way this code can be reached is if we just finished the race
                //we want all of the following code to be executed ONLY once
                this._finished = true;
                canPause = false;
                console.log("all laps finished");
                //this does not replace anything: it just draws on top of the previous image
                this._bg = new createjs.Bitmap(assets.getResult("Overlay"));
                this.addChild(this._bg);
                //add a new button so we can return to the main menu
                this._returnBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, 465, 177, 84);
                this.addChild(this._returnBtn);
                this._returnBtn.on("click", this._returnBtnClick, this);
                //we want to be grammatically correct
                var plural = "";
                if (this._TOTAL_LAPS > 1)
                    plural = "s";
                //after removing old text, show the final time and # of laps
                this.removeChild(this._lapDisplay);
                this._lapDisplay = new objects.Label("Finished " + this._TOTAL_LAPS.toString() + " Lap" + plural, "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y);
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