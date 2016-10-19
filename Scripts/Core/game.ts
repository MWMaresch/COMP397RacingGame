/// <reference path = "_reference.ts" />

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var shipAtlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;
var numLaps: number;

var collision: managers.Collision;

var virtualCanvas = document.createElement('canvas');
var virtualCanvas2d = virtualCanvas.getContext('2d');

var paused : boolean = false;
var exitBtn : objects.Button;
var pauseBg : createjs.Bitmap;
var canPause : boolean = false;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "Menu_BG", src:"../../Assets/images/titlescreen.png"},
    {id: "PlayBtn", src:"../../Assets/images/playBtn.png"},
    {id: "Player", src:"../../Assets/images/shipAtlas.png"},
    {id: "Player1", src:"../../Assets/images/redcar.png"},
    {id: "Player2", src:"../../Assets/images/bluecar.png"},
    {id: "Pause", src:"../../Assets/images/pause.png"},
    {id: "Overlay", src:"../../Assets/images/FinishOverlay.png"},
    {id: "ExitBtn", src:"../../Assets/images/exit.png"},
    {id: "LapBtn", src:"../../Assets/images/1lap.png"},
    {id: "TimAtBtn", src:"../../Assets/images/TimeAttack.png"},
    {id: "2PBtn", src:"../../Assets/images/2Pvs.png"},
    {id: "InstBtn", src:"../../Assets/images/Instructions.png"},
    {id: "Instructions", src:"../../Assets/images/Instructions screen.png"},
    {id: "Track", src:"../../Assets/images/track1.png"},
    {id: "FinishLine", src:"../../Assets/images/finish.png"},
    {id: "Block", src:"../../Assets/images/block.png"}

];

function drawVirtualTrack(){
    var background = new Image();
    virtualCanvas.width = canvas.clientWidth;
    virtualCanvas.height = canvas.clientHeight;
    background.src = "../../Assets/images/track1.png";//calling the asset doesn't work
    virtualCanvas2d.drawImage(background,0,0);
}

function getPixel(x:number, y:number){
    return virtualCanvas2d.getImageData(x,y,x+1,y+1);
}

function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);


    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function exitBtnClick(event : createjs.MouseEvent) {
    canPause = false;
    paused = false;
    scene = config.Scene.MENU;
    changeScene();
}

function togglePause(){
    if (!paused && canPause)
    {
        stage.addChild(pauseBg);
        stage.addChild(exitBtn);
        exitBtn.on("click", exitBtnClick, this);
        paused = true;
    }
    else
    {
        stage.removeChild(pauseBg);
        stage.removeChild(exitBtn);
        paused = false;
    }
}

function init() {
    // Reference to canvas element
    pauseBg = new createjs.Bitmap(assets.getResult("Pause"));
    exitBtn = new objects.Button("ExitBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 150, 177, 84);
    canvas = document.getElementById("canvas");

    drawVirtualTrack();

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);

    collision = new managers.Collision();

    let atlasData = {
        images: [assets.getResult("FinishLine"),  assets.getResult("Player1"),  assets.getResult("Player2")],

        frames:[ [0, 0, 241, 13, 0], [0, 0, 32, 64, 1], [0, 0, 32, 64, 2]],

        animations: {
        finishline: 0,
        redcar: 1,
        bluecar: 2
        },

        "texturepacker": [
                "SmartUpdateHash: $TexturePacker:SmartUpdate:013a2fc3dc6ba39276db3e6758d1ddbd:84789f29f2d01b3ea1c113a3b2d1bfdc:e696b1a5c9e543dbf26d7c8d29a6d04f$",
                "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    }

    shipAtlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.MENU;
    changeScene();
    numLaps = 3;
}

function gameLoop(event: createjs.Event): void {
    if (!paused)
    {
        // Update whatever scene is currently active.
        currentScene.update();
    }
    stage.update();    
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.SINGLEPLAYER :
            stage.removeAllChildren();
            currentScene = new scenes.Track();
            console.log("Starting TRACK scene");
            break;
        case config.Scene.MULTIPLAYER :
            stage.removeAllChildren();
            currentScene = new scenes.MultiplayerTrack();
            console.log("Starting MULTIPLAYER scene");
            break;
        case config.Scene.INSTRUCTIONS :
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
    
}