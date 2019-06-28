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
    this.load.image('green', 'green.png');
    this.load.image('ninja', 'ninja.png');
}

function create(){
    this.add.image(400, 300, 'green');
    cursor = this.input.keyboard.createCursorKeys();
    player = this.physics.add.sprite(100, 100, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);
}

function update(){
    if(cursor.up.isDown){
        player.setVelocityY(-100);
    }
    else if(cursor.down.isDown){
        player.setVelocityY(100);
    } 
    else{
        player.setVelocityY(0);
    }

    if(cursor.left.isDown){
        player.setVelocityX(-100);
    }
    else if(cursor.right.isDown){
        player.setVelocityX(100);
    }
    else{
        player.setVelocityX(0);
    }
}