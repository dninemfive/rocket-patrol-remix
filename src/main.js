console.log("Loaded.");
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;

let highScore = 0;
let timerDelta = 0.1; // resolution of the timer, as a fraction of one second

// if we make this a global we don't have to copy this to multiple contexts >.>
let textConfig = {
    fontFamily: "Courier",
    fontSize: "28px",
    backgroundColor: "#F3B141",
    color: "#843605",
    align: "right",
    padding: { top: 5, bottom: 5 },
    fixedWidth: 0
}
let menuConfig = {
    fontFamily: "Courier",
    fontSize: "28px",
    backgroundColor: "#00FF00",
    color: "#000000",
    align: "right",
    padding: { top: 5, bottom: 5 },
    fixedWidth: 0
}