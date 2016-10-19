/*
    Module to store globally accessible values and states for the game.
*/
module config {
    export class Scene {
        public static MENU : number = 0;
        public static SINGLEPLAYER : number = 1;
        public static MULTIPLAYER : number = 2;
        public static INSTRUCTIONS : number = 3;
    }

    export class Screen {
        public static WIDTH : number = 1024;
        public static HEIGHT : number = 480;
        public static CENTER_X : number = 512;
        public static CENTER_Y : number = 240;
    }
    
    export class Game {
        public static FPS : number = 60;
    }
}