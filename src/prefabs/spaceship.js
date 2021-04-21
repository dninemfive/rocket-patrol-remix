class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.active = true;
    }

    update(){
        if (this.active) {
            this.x -= this.moveSpeed;
        }
        if(this.x <= -this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}