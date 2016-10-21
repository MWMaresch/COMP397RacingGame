module scenes {
    export class MultiplayerTrack extends objects.Scene {

        private _bg : createjs.Bitmap;
        private _p1car : objects.Player;
        private _p2car : objects.Player2;
        private _finishLine : objects.FinishLine;
        private _checkpoint1 : objects.Checkpoint;
        private _checkpoint2 : objects.Checkpoint;
        private _p1lapDisplay : objects.Label;
        private _p2lapDisplay : objects.Label;
        private _timeDisplay : objects.Label;
        private _p1curLap : number;
        private _p1curCheckpoint : number;
        private _p2curLap : number;
        private _p2curCheckpoint : number;
        private _timer : number;
        private _finished : boolean;
        private _returnBtn : objects.Button;
        //constant for this race
        private _TOTAL_LAPS : number;

        constructor() {
            super();
        }

        public start() : void {

            //initialize private variables
            this._p1curLap = 1;
            this._p2curLap = 1;
            this._p1curCheckpoint = 0;
            this._p2curCheckpoint = 0;
            this._timer = 0;
            this._finished = false;
            this._TOTAL_LAPS = numLaps;

            this._bg = new createjs.Bitmap(assets.getResult("Track"));
            this.addChild(this._bg);

            //finish line & checkpoints
            this._finishLine = new objects.FinishLine(118,288);
            this.addChild(this._finishLine);
            this._checkpoint1 = new objects.Checkpoint(880,182);
            this.addChild(this._checkpoint1);
            this._checkpoint2 = new objects.Checkpoint(880,440);
            this.addChild(this._checkpoint2);

            //both players
            this._p1car = new objects.Player("redcar",90,365);
            this._p2car = new objects.Player2("bluecar",130,365);
            this.addChild(this._p1car);
            this.addChild(this._p2car);

            //HUD
            this._p1lapDisplay = new objects.Label("P1 Lap " + this._p1curLap.toString() + "/" + this._TOTAL_LAPS.toString(), "30px Consolas", "#ffffff", 600, 80);
            this.addChild(this._p1lapDisplay);
            this._p2lapDisplay = new objects.Label("P2 Lap " + this._p1curLap.toString() + "/" + this._TOTAL_LAPS.toString(), "30px Consolas", "#ffffff", 600, 110);
            this.addChild(this._p2lapDisplay);
            this._timeDisplay = new objects.Label("0", "50px Consolas", "#ffffff", 500, 30);
            this.addChild(this._timeDisplay);

            stage.addChild(this);
            canPause = true;
        }

        private _updateLapDisplay() : void {
            //we want to display what laps both players are on
            this._p1lapDisplay.text = "P1 Lap " + this._p1curLap.toString() + "/" + this._TOTAL_LAPS.toString();
            this._p2lapDisplay.text = "P2 Lap " + this._p2curLap.toString() + "/" + this._TOTAL_LAPS.toString();
        }

        private _checkPlayerCollisions() : void {
            //Player1
            //check collision over finish line
            if (this._p1curCheckpoint == 2 && collision.boxCheck(this._finishLine,this._p1car )) {
                this._p1curLap ++;
                this._updateLapDisplay();
                this._p1curCheckpoint = 0;
            }
            //checkpoints
            if (collision.boxCheck(this._checkpoint1,this._p1car ))
                this._p1curCheckpoint = 1;
            
            if (collision.boxCheck(this._checkpoint2,this._p1car ) && this._p1curCheckpoint == 1)
                this._p1curCheckpoint = 2;
            
            //Player2 finish line and checkpoints
            if (this._p2curCheckpoint == 2 && collision.boxCheck(this._finishLine,this._p2car ))
            {
                this._p2curLap ++;
                this._updateLapDisplay();
                this._p2curCheckpoint = 0;
            }
            if (collision.boxCheck(this._checkpoint2,this._p2car ))            
               this._p2curCheckpoint = 1;
            
            if (collision.boxCheck(this._checkpoint2,this._p2car ) && this._p2curCheckpoint == 1)            
                this._p2curCheckpoint = 2;
            
            if (collision.circleCheck(this._p1car, this._p2car))
            {
                this._p1car.bump(this._p2car.position.x, this._p2car.position.y);
                this._p2car.bump(this._p1car.position.x, this._p1car.position.y);
            }
        }
        
        public update() : void {

            if (this._p1curLap <= this._TOTAL_LAPS && this._p2curLap <= this._TOTAL_LAPS ) {
                this._timer += createjs.Ticker.interval;
                this._timeDisplay.text = "Time: " + (Math.round(this._timer/10)/100).toString();

                this._checkPlayerCollisions();

                this._p1car.update();
                this._p2car.update();
            }
            //we only want to execute the following code once
            else if (!this._finished) {   
                this._finished = true;
                canPause = false;
                console.log("all laps finished");

                let winner : String;

                this._bg = new createjs.Bitmap(assets.getResult("Overlay"));
                this.addChild(this._bg);

                this._returnBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, 465, 177, 84);          
                this.addChild(this._returnBtn);
                this._returnBtn.on("click", this._returnBtnClick, this);

                //decide who the winner is
                //it's next to impossible for them to finish on the same frame
                if (this._p1curLap > this._p2curLap)
                    winner = "Player 1";                
                else
                    winner = "Player 2";                

                var plural : String = "";
                if (this._TOTAL_LAPS > 1)
                    plural = "s";

                this.removeChild(this._p1lapDisplay);
                this.removeChild(this._p2lapDisplay);
                this._p1lapDisplay = new objects.Label(winner + " Wins!\n\nFinished "+ this._TOTAL_LAPS.toString() + " Lap" + plural , "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y);
                this.addChild(this._p1lapDisplay);

                this.removeChild(this._timeDisplay);
                this._timeDisplay = new objects.Label("in " + (Math.round(this._timer/10)/100).toString() + " seconds", "50px Consolas", "#ffffff", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100);
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