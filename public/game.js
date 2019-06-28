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
var wall;
var dashtime;
var dash;
var regtime; // reg for dash

function preload(){
    this.load.image('grey', 'assets/grey.png');
    this.load.image('ninja', 'assets/ninja.png');
    this.load.image('wall', 'assets/wall.png');
}

function create(){
    this.add.image(400, 300, 'grey');
    cursor = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    player = this.physics.add.sprite(100, 100, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);

    wall = this.physics.add.staticGroup();
    wall.create(300, 300, 'wall');
    this.physics.add.collider(player,wall);

    dashtime=this.time.now;
    dash=2;

    //this.dashcount = game.add.text(600, 20, "#dash: ", { font: "16px Arial", fill: "#ffffff", align: "right" });
}

function update(){
    if(cursor.up.isDown){
        player.setVelocityY(-200);
    }
    else if(cursor.down.isDown){
        player.setVelocityY(200);
    } 
    else{
        player.setVelocityY(0);
    }

    if(cursor.left.isDown){
        player.setVelocityX(-200);
    }
    else if(cursor.right.isDown){
        player.setVelocityX(200);
    }
    else{
        player.setVelocityX(0);
    }

    // double dash
    if(this.space.isDown && dash>=0){
        if(this.time.now>dashtime){
            player.x+=100;
            dash--;
            dashtime=this.time.now+200;
        }
    }

    // regen
    if(this.time.now>regtime){
        dash++;
        regtime=this.time.now+1000;
    }
    
    // hidden ninja function
    // camera - from jack
    // angle thingy
    // relocate to asset
}