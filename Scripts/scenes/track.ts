module scenes {
    export class Track extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _car : objects.Player;
        private _finishLine : objects.FinishLine;
        private _checkpoint1 : objects.Checkpoint;
        private _checkpoint2 : objects.Checkpoint;
        private _lapDisplay : objects.Label;
        private _timeDisplay : objects.Label;
        private _curLap : number;
        private _curCheckpoint : number;
        private _totalLaps : number;
        private _timer : number = 0;
        private _lapTimes : number[];
        private _finished : boolean = false;
        private _returnBtn : objects.Button;        


        constructor() {
            super();
        }

        public start() : void {

            //private vars
            this._totalLaps = numLaps;
            this._lapTimes = [0];//may not implement
            this._curLap = 1;
            this._curCheckpoint = 0;

            this._bg = new createjs.Bitmap(assets.getResult("Track"));
            this.addChild(this._bg);

            //finish line & checkpoints
            this._finishLine = new objects.FinishLine(118,315);
            this.addChild(this._finishLine);
            this._checkpoint1 = new objects.Checkpoint(880,182);
            this.addChild(this._checkpoint1);
            this._checkpoint2 = new objects.Checkpoint(880,440);
            this.addChild(this._checkpoint2);

            this._car = new objects.Player("redcar",90,365);
            this.addChild(this._car);

            //HUD
            this._lapDisplay = new objects.Label("Lap " + this._curLap.toString() + "/" + this._totalLaps.toString(), "50px Consolas", "#ffffff", 600, 80);
            this.addChild(this._lapDisplay);
            this._timeDisplay = new objects.Label("0", "50px Consolas", "#ffffff", 500, 30);
            this.addChild(this._timeDisplay);

            stage.addChild(this);
            canPause = true;
        }

        private _updateLapDisplay() : void {
            this._lapDisplay.text = "Lap " + this._curLap.toString() + "/" + this._totalLaps.toString();            
        }

        public update() : void {

            if (this._curLap <= this._totalLaps)
            {
                this._timer += createjs.Ticker.interval;
                this._timeDisplay.text = "Time: " + (Math.round(this._timer/10)/100).toString();
                // (Math.round(this._lapTimes[0]/10)/100).toString();

                if (this._curCheckpoint == 2 && collision.boxCheck(this._finishLine,this._car ))
                {
                    this._lapTimes[this._curLap-1] = this._timer;
                    this._curLap ++;
                    this._updateLapDisplay();
                    this._curCheckpoint = 0;
                }
                if (collision.boxCheck(this._checkpoint1,this._car ))
                {
                    this._curCheckpoint = 1;
                }
                if (collision.boxCheck(this._checkpoint2,this._car ) && this._curCheckpoint == 1)
                {
                    this._curCheckpoint = 2;
                }

                this._car.update();
            }
            else if (!this._finished)
            {
                canPause = false;
                console.log("all laps finished");
                this._finished = true;

                this._bg = new createjs.Bitmap(assets.getResult("Overlay"));
                this.addChild(this._bg);

                this._returnBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, 465, 177, 84);          
                this.addChild(this._returnBtn);
                this._returnBtn.on("click", this._returnBtnClick, this);

                var plural : String = "";
                if (this._totalLaps > 1)
                {
                    plural = "s";
                }

                this.removeChild(this._lapDisplay);
                this._lapDisplay = new objects.Label("Finished "+ this._totalLaps.toString() + " Lap" + plural , "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y);
                this.addChild(this._lapDisplay);

                this.removeChild(this._timeDisplay);
                this._timeDisplay = new objects.Label("in " + (Math.round(this._timer/10)/100).toString() + " seconds", "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y + 50);
                this.addChild(this._timeDisplay);
            }
        }

        private _returnBtnClick(event : createjs.MouseEvent) {
            this.removeAllChildren();
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}