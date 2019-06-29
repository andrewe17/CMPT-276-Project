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
var pointer; // position of cursor

function preload(){
    //this.load.image('grey', 'assets/grey.png');
    this.load.image('ninja', 'assets/ninja.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('van', 'assets/van.jpg');
}

function create(){
    this.cameras.main.setBounds(0, 0, 3723, 2000);
    this.physics.world.setBounds(0, 0, 3723, 2000);

    //add image to background
    this.add.image(1861, 1000, 'van');
    cursor = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    player = this.physics.add.sprite(100, 100, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);

    //make camera follow the player 
    this.cameras.main.startFollow(player, true, 0.08, 0.08,0.08,0.08);

    // obsticles
    wall = this.physics.add.staticGroup();
    wall.create(300, 300, 'wall');
    this.physics.add.collider(player,wall);

    // dash
    dashtime=this.time.now;
    regtime=this.time.now;
    dash=2;
    // dash counter
    this.add.text(0, 0, 'dashes: '+dash, { fontFamily: '"Roboto Condensed"' });

    // dash angle - position of cursor
    pointer = this.input.activePointer;
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
    if(this.space.isDown && dash>0){
        if(this.time.now>dashtime){
            player.x+=100;
            dash--;
            dashtime=this.time.now+200;
        }
    }

    // regen
    if(this.time.now>regtime){
        dash++;
        regtime=this.time.now+10000;
    }
    
    // hidden ninja function
    // angle thingy
    // test
}
