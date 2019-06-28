import { cursorTo } from "readline";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    //this.load.image('sky', 'sky.png');
    this.load.image('logo', 'face.jpg');
    this.load.image('green', 'green.png');
}

function create ()
{
    this.add.image(400, 300, 'green');
    //this.add.image(400, 300, 'sky');

    var logo = this.physics.add.image(100, 100, 'logo');

    logo.setVelocity(0, 0);
    //logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    //emitter.startFollow(logo);
}

function update(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
        logo.y-=100;
    };
    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        logo.y+=100;
    };
    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
        logo.y-=100;
    };
    if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
        logo.y+=100;
    };

}