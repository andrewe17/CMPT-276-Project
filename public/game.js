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
var dash;
var dashtime; // #dashes
var dashtext;
var regtime; // regen
var regtext;
var pointer; // mouse position

function preload(){
    this.load.image('ninja', 'assets/ninja.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('van', 'assets/van.jpg');
}

function create(){
    // set camera
    this.cameras.main.setBounds(0, 0, 3723, 2000);
    this.physics.world.setBounds(0, 0, 3723, 2000);

    // background image
    this.add.image(1861, 1000, 'van');

    // keyboard keys
    cursor = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // player
    player = this.physics.add.sprite(100, 100, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);

    // camera follow player 
    this.cameras.main.startFollow(player, true, 0.08, 0.08, 0.08, 0.08);

    // obsticles
    wall = this.physics.add.staticGroup();
    wall.create(300, 300, 'wall');
    this.physics.add.collider(player,wall);

    // dash
    dash=1;
    dashtime=this.time.now;
    dashtext=this.add.text(0, 0, 'dash: '+dash, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    regtime=this.time.now;
    regtext=this.add.text(0, 100, 'regen: '+0, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);

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
            dash--;
            dashtime=this.time.now+200;
            dashtext.text='#dashes: '+dash;
            player.x+=100;
        }
    }

    // regen
    if(this.time.now>regtime && dash<2){
        dash++;
        regtime=this.time.now+10000;
        dashtext.text='#dashes: '+dash;
    }
    regtext='regen: '+(regtime-this.time.now);

    // hidden ninja function
    // angle thingy
    // test
}
