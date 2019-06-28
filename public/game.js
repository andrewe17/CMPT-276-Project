// import { cursorTo } from "readline";
var w = 800;
var h = 600;

var config={
    type: Phaser.AUTO,
    width: w,
    height: h,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursor;
var player;

function preload(){
    this.load.image('logo', 'face.jpg');
    this.load.image('green', 'green.png');
}

function create(){
    this.add.image(400, 300, 'green');
    cursor = this.input.keyboard.createCursorKeys();
    player = this.physics.add.sprite(100, 100, 'logo');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);
    player.scale.setTo(10, 10);
    
}

function update(){
    if(cursor.up.isDown) player.setVelocityY(-10);
    if(cursor.down.isDown) player.setVelocityY(10);
    if(cursor.left.isDown) player.setVelocityX(-10);
    if(cursor.right.isDown) player.setVelocityX(10);
}