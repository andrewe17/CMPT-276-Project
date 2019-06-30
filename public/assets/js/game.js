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

// map -- may be change this to tile map?
var mapx = 3723;
var mapy = 2000;
// keyboard
var cursor;
var w, a, s, d, space;
// mouse
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
var angle;

function preload(){
    this.load.image('ninja', 'assets/images/ninja.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('van', 'assets/images/van.jpg');
}

function create(){
    // camera
    this.cameras.main.setBounds(0, 0, 3723, 2000);
    this.physics.world.setBounds(0, 0, 3723, 2000);

    // background
    this.add.image(1861, 1000, 'van');

    // keyboard
    cursor = this.input.keyboard.createCursorKeys();
    w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // mouse
    pointer = this.input.activePointer; // mouse location relative to screen
    this.input.mouse.capture = true;

    // player
    player = this.physics.add.sprite(400, 300, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);

    // camera follow player
    this.cameras.main.startFollow(player, true, 0.08, 0.08, 0.08, 0.08);

    // obsticles
    wall = this.physics.add.staticGroup();
    wall.create(400, 200, 'wall');

    this.physics.add.collider(player, wall, fx);

    // dash
    dash=100; // need to change to zero
    dashtime=this.time.now;
    regtime=this.time.now;

    // text
    dashtext=this.add.text(0, 0, 'dash: '+dash, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    regtext=this.add.text(0, 20, 'regen: '+(regtime-this.time.now), {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    verstext=this.add.text(0, 40, 'vers: '+906, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    xtext=this.add.text(0, 60, 'xtext: ', {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
    //ytext=this.add.text(0, 80, 'y: '+0, {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
}

function update(){
    // keys
    if(w.isDown){
        player.setVelocityY(-200);
    }
    else if(s.isDown){
        player.setVelocityY(200);
    }
    else{
        player.setVelocityY(0);
    }
    if(a.isDown){
        player.setVelocityX(-200);
    }
    else if(d.isDown){
        player.setVelocityX(200);
    }
    else{
        player.setVelocityX(0);
    }

    // dash
    if(space.isDown && dash>0){
        if(this.time.now>dashtime){
            dash--;
            dashtime=this.time.now+200;
            regtime=this.time.now+10000;
            player.x+=Math.cos(angle)*100;
            player.y+=Math.sin(angle)*100;
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

    // calculate angle between player and mouse
    pointer = this.input.activePointer; // update position of mouse
    if(player.x<400) mousex=pointer.x-player.x; // find mouse position (x) relative to player
    else if(player.x>(mapx-400)) mousex=pointer.x-(player.x-(mapx-800));
    else mousex=pointer.x-400;
    if(player.y<300) mousey=pointer.y-player.y; // find mouse position (y) relative to player
    else if(player.y>(mapy-300))mousey=pointer.y-(player.y-(mapy-600));
    else mousey=pointer.y-300;
    angle = Math.atan(mousey/mousex); // find angle between player and mouse
    if(mousex<0) angle+=Math.PI;

    // attack - left mouse
    // crouch - ctrl+c - hidden
    // lava and traps
    // limited views

    // text
    dashtext.text='dash: '+dash;
    regtext.text='regen: '+(regtime-this.time.now);
    xtext.text='left: '+this.input.activePointer.leftButton.isDown;
}

function fx(player, wall){
    if(wall.y>player.y) player.y-=10;
    else player.y+=10;
}