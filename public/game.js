var config={
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

// map
var mapx = 3723;
var mapy = 2000;
// keyboard + mouse
var cursor;
var pointer;
var mousex;
var mousey;
// objects
var player;
var wall;
// dash
var dash;
var dashtime;
var regtime; 
// text
var dashtext;
var regtext;
var verstext;
var xtext;
var ytext;
// mouse
var mousex;
var mousey;

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

    // keyboard + mouse
    cursor = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    pointer = this.input.activePointer; // mouse

    // player
    player = this.physics.add.sprite(400, 300, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);

    // camera follow player 
    this.cameras.main.startFollow(player, true, 0.08, 0.08, 0.08, 0.08);

    // obsticles
    wall = this.physics.add.staticGroup();
    wall.create(300, 300, 'wall');
    this.physics.add.collider(player,wall);

    // dash
    dash=0;
    dashtime=this.time.now;
    regtime=this.time.now;

    // text
    dashtext=this.add.text(0, 0, 'dash: '+dash, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    regtext=this.add.text(0, 20, 'regen: '+(regtime-this.time.now), {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    verstext=this.add.text(0, 40, 'vers: '+422, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    xtext=this.add.text(0, 60, 'x: '+0, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    ytext=this.add.text(0, 80, 'y: '+0, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);

}

function update(){
    // keys
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

    // dash
    if(this.space.isDown && dash>0){
        if(this.time.now>dashtime){
            dash--;
            dashtime=this.time.now+200;
            regtime=this.time.now+10000;
            player.x+=100;
        }
    }

    // regen
    if(this.time.now>regtime){
        if(dash<2){
            dash++;
            regtime=this.time.now+10000;
        }
        else{
            regtime=this.time.now;
        }
    }

    // text
    dashtext.text='dash: '+dash;
    regtext.text='regen: '+(regtime-this.time.now);

    // mouse position
    mouse_position();

    xtext.text='mousex: '+mousex;
    ytext.text='mousey: '+mousey;

    // hidden ninja function
}

// gets the x and y position of mouse relative to player
function mouse_position(){
    // mouse x
    pointer = this.input.activePointer;
    if(player.x<400){
        mousex=pointer.x-player.x;
    }
    else if(player.x>(mapx-400)){
        mousex=pointer.x-(player.x-(mapx-800));
    }
    else{
        mousex=pointer.x-400;
    }
    // mouse y
    if(player.y<300){
        mousey=pointer.y-player.y;
    }
    else if(player.y>(mapy-300)){
        mousey=pointer.y-(player.y-(mapy-600));
    }
    else{
        mousey=pointer.y-300;
    }
}