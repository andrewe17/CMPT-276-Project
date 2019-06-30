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
var one, two, three, four;
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
var dashreg;
// weapons
var options; 
// katana
var katatime;
// shurikan
var shuri;
var shuritime;
var shurireg;

// textbox
var textbox;

// mouse
var mousex;
var mousey;
var angle;

function preload(){
    this.load.image('van', 'assets/images/van.jpg');
    this.load.image('ninja', 'assets/images/ninja.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('slash', 'assets/images/slash.png');
    this.load.image('shuriken', 'assets/images/shuriken.png');
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
    one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    three = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    four = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);

    // mouse
    pointer = this.input.activePointer; // mouse location relative to screen

    // player
    player = this.physics.add.sprite(400, 300, 'ninja');
    player.setCollideWorldBounds(true);
    player.setVelocity(0, 0);

    // camera follow player
    this.cameras.main.startFollow(player, true, 0.08, 0.08, 0.08, 0.08);

    // obsticles
    wall = this.physics.add.staticGroup();
    wall.create(400, 200, 'wall');
    this.physics.add.collider(player, wall, fx); // collision handling

    // dash
    dash=0;
    dashtime=this.time.now;
    dashreg=this.time.now;
    // weapons
    options=1;
    katatime=this.time.now;

    shuri=0;
    shuritime=this.time.now;
    shurireg=this.time.now;
    // text
    textbox=this.add.text(0, 0, '', {fontFamily:'"Roboto Condensed"'}).setScrollFactor(0);
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
    if(one.isDown) options=1;
    if(two.isDown) options=2;
    if(three.isDown) options=3;
    if(four.isDown) options=4;

    // dash
    if(space.isDown && dash>0){
        if(this.time.now>dashtime){
            player.x+=Math.cos(angle)*100;
            player.y+=Math.sin(angle)*100;
            dashtime=this.time.now+200;
            dash--;
        }
    }
    if(this.time.now>dashreg){ // dash regen
        if(dash<2){
            dashreg=this.time.now+10000;
            dash++;
        }
        else{
            dashreg=this.time.now;
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
    
    pointer = this.input.activePointer;
    if(pointer.leftButtonDown() && shuri>0){ // left click
        // shuri
        if(options==1 && this.time.now>katatime){
            // play animation, if target infront than lose health
            // slash = this.physics.add.sprite(player.x+Math.cos(angle)*20, player.y+Math.sin(angle)*20, 'slash');
            katatime=this.time.now+100;
        }
        if(options==2 && this.time.now>shuritime){
            shuriken = this.physics.add.sprite(player.x+Math.cos(angle)*20, player.y+Math.sin(angle)*20, 'shuriken');
            shuriken.setVelocityX(Math.cos(angle)*200);
            shuriken.setVelocityY(Math.sin(angle)*200);
            shuritime=this.time.now+100;
            shuri--;
            shurireg=this.time.now+1000; // only 2 dashes
        }
    }
    if(this.time.now>shurireg){ // shuri regen
        if(shuri<10){
            shurireg=this.time.now+1000;
            shuri++;
        }
        else{
            shurireg=this.time.now;
        }
    }

    // katana
    // mines
    // dash need smoke effect
    // need animation for chracter on movement
    // implement background using tiles?
    // crouch - ctrl+c - hidden
    // lava and traps
    // limited views
    // health

    // text
    textbox.setText([
        'dash: '+dash+' ('+Math.round((dashreg-this.time.now)/100)+')',
        'kata: -- ('+Math.round((katatime-this.time.now)/100)+')',
        'shuri: '+shuri,
        'options: '+options,
        'vers: '+1129
    ]);
}

function fx(player, wall){
    if(wall.y>player.y) player.y-=10;
    else player.y+=10;
}