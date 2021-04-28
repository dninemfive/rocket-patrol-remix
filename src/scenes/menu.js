class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload(){
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        this.keyboardCtrlStr = "Use ←→ arrows to move and F to fire";
        this.mouseCtrlStr = "Use mouse to move and lclick to fire";

        this.add.text(game.config.width / 2, (borderUISize + borderPadding), " ROCKET PATROL ", textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 2, "Press M to toggle mouse control:", textConfig).setOrigin(0.5);
        this.controlText = this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 3, "", textConfig).setOrigin(0.5);
        if(useMouse){
            this.controlText.text = this.mouseCtrlStr;
        } else {
            this.controlText.text = this.keyboardCtrlStr;
        }
        this.numShipsText =  this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 4, "Press N to set the number of ships: " + numShips, textConfig).setOrigin(0.5);
        this.shipSpeedText = this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 5, "Press S to set ship speed: " + shipSpeed, textConfig).setOrigin(0.5);
        this.timerText =     this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 6, "Press T to set timer: " + timeLimit, textConfig).setOrigin(0.5);
        this.difficultyModText = this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 7, "Difficulty modifier: " + difficultyMod, textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 8, "Press SPACE to start", menuConfig).setOrigin(0.5);
        
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.setDifficultyMod();
    }    

    toggleMouse(){
        useMouse = !useMouse;
        if(useMouse){
            this.controlText.text = this.mouseCtrlStr;
        } else {
            this.controlText.text = this.keyboardCtrlStr;
        }
    }

    setNumShips(){
        let result = "NaN";        
        // from https://stackoverflow.com/a/175787
        while(isNaN(result) || isNaN(parseFloat(result))){
            result = prompt("Enter the number of ships");
        }
        let num = parseInt(result);
        if(num < 1) {
            num = 1;
        }
        if(num > 5){
            num = 5;
        }
        numShips = num;
        this.numShipsText.text = "Press N to set the number of ships: " + numShips;
        this.setDifficultyMod();
    }

    setShipSpeed(){
        let result = "NaN";        
        // from https://stackoverflow.com/a/175787
        while(isNaN(result) || isNaN(parseFloat(result))){
            result = prompt("Enter ship speed");
        }
        let num = parseInt(result);
        if(num < 1) {
            num = 1;
        }
        if(num > 20){
            num = 20;
        }
        shipSpeed = num;
        this.shipSpeedText.text = "Press S to set ship speed: " + shipSpeed;
        this.setDifficultyMod();
    }

    setDifficultyMod(){
        // complicated formula put together in Desmos.
        // TL;DR is it scales with the number of ships and the speed, with a linear offset based on how long you have to score
        // Default "normal" difficulty settings from the original game result in a modifier of 1.
        difficultyMod = (1 + Math.log10(numShips)) * (1 + Math.log10(shipSpeed));
        difficultyMod /= ((1 + Math.log10(3)) ** 2);
        difficultyMod = difficultyMod ** 2;
        difficultyMod *= (timeLimit / 45);
        difficultyMod = Math.round(difficultyMod * 100) / 100;
        this.difficultyModText.text = "Difficulty modifier: " + difficultyMod;
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            game.settings = {
                spaceshipSpeed: shipSpeed,
                gameTimer: timeLimit
            }
            this.sound.play("sfx_select");
            this.scene.start("play");
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyM)){            
            this.toggleMouse();
            this.sound.play("sfx_select");
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyN)){
            this.setNumShips();
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.setShipSpeed();
        }
    }    
}