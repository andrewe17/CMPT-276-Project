// import { cursorTo } from "readline";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'p2js',
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursor;
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
    cursor = this.input.keyboard.createCursorKeys();
    player = this.add.sprite(this.world.centerX, this.world.centerY, 'logo');
    game.physics.p2.enable(player);
}

function update(){
    
    /*
    this.cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });*/

    if(cursor.up.isDown) player.y-=100;
    if(cursor.down.isDown) player.y+=100;
    if(cursor.left.isDown) player.x-=100;
    if(cursor.right.isDown) player.x+=100;

}