/*
    Rocket Patrol Mods Assignment - 4/23/21 - 10hr or so

    Points (see https://github.com/dninemfive/rocket-patrol-remix/projects/1 for detailed status):
         85

    Breakdown:
    #pts    Completed?    Description
       5    Yes             Missile controllable in flight by player
       5    Yes             Randomized delay on ship respawn
       5    Yes             High Score saved between playthroughs and displayed in game
       10   Yes             Timer visible during gameplay and ticks down properly
       20   Yes             Time added to clock each time a ship is destroyed
       20   Yes             Full control of spaceship with mouse, toggled on the main menu
       10   Yes             Variable number of ships, set on the main menu
       10   Yes             Dynamic score multiplier based on number of ships and speed
       20   No              Multi-Target Powerup (second weapon on the assignment)
       10   No              Rebindable Controls
       
*/
console.log("Loaded.");
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    autoCenter: Phaser.CENTER_HORIZONTALLY
};
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;
let useMouse = true;

let highScore = 0;
let timerDelta = 0.1; // resolution of the timer, as a fraction of one second
let timeGainOnKill = 3 * timerDelta;
let numShips = 4;
let shipSpeed = 3;
let difficultyMod = 1.0;
let timeLimit = 45;

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