module objects {
    export class FinishLine extends objects.GameObject {

        // PUBLIC VARIABLES
        public name:string;
        public width:number;
        public height:number;

        constructor(x:number, y:number) {
            super("finishline", "");
            this.x = x;
            this.y = y;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

        }

        public update() : void {

            super.update();
        }

    }
}