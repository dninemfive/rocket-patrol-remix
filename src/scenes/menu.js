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
        this.keyboardCtrlStr = "Use ←→ arrows to move & (F) to fire";
        this.mouseCtrlStr = "Use mouse to move and lclick to fire";

        this.add.text(game.config.width / 2, (borderUISize + borderPadding), " ROCKET PATROL ", textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 2, "Press M to toggle mouse control:", textConfig).setOrigin(0.5);
        this.controlText = this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 3, "", textConfig).setOrigin(0.5);
        if(useMouse){
            this.controlText.text = this.mouseCtrlStr;
        } else {
            this.controlText.text = this.keyboardCtrlStr;
        }
        this.numShipsText = this.add.text(game.config.width / 2, (borderUISize + borderPadding) * 4, "Press N to set the number of ships: " + numShips, textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width / 2, game.config.height / 2, "✗", textConfig).setOrigin(0.5);
        //this.add.text(game.config.width / 2 + 40, game.config.height / 2, "✓", menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
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
        while(isNaN(result)){
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
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            // easy
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 5 // in seconds, will be multiplied by 1000 later
            }
            this.sound.play("sfx_select");
            this.scene.start("play");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 7
            }
            this.sound.play("sfx_select");
            this.scene.start("play");
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyM)){
            this.toggleMouse();
        }
        if(Phaser.Input.Keyboard.JustDown(this.keyN)){
            this.setNumShips();
        }
    }    
}