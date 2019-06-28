// import { cursorTo } from "readline";

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
var player;

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
    player = this.add.spirite(100, 100, 'logo')
    //var logo = this.physics.add.image(100, 100, 'logo');

    //logo.setVelocity(0, 0);
    player.setCollideWorldBounds(true);
}

function update(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
        player.y-=100;
    };
    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        player.y+=100;
    };
    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
        player.x-=100;
    };
    if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
        player.x+=100;
    };

}