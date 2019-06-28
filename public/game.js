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
    this.load.spritesheet('dude', 'dude.png', 32, 48, 9) // 32 48

}

function create(){
    this.add.image(400, 300, 'green');
    cursor = this.input.keyboard.createCursorKeys();
    player = this.physics.add.sprite(100, 100, 'dude');
    player.anims.create({
        key: 'left',
        frames: player.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    player.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    player.anims.create({
        key: 'right',
        frames: player.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);
    player.setScale(0.2);
    
}

function update(){
    if(cursor.up.isDown) player.setVelocityY(-10);
    if(cursor.down.isDown) player.setVelocityY(10);
    if(cursor.left.isDown) player.setVelocityX(-10);
    if(cursor.right.isDown) player.setVelocityX(10);
}