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

var mapx = 2780;
var mapy = 2780;
// global time
var gg;

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
var otext;
// melee weapon
var kata;
var katatime;
var katareg;
// ranged weapon
var shuri;
var shuritime;
var shurireg;
// stun+damange mine
var kibaku;
var kibakutime;
var kibakureg;
// healing 
var saisei;
var saiseitime;
var saiseireg;
// cannot use ctrl+c or move

// misc
var health;
var kills;

// textbox
var text1, text2, text3, text4;

// mouse
var mousex;
var mousey;
var angle;

function preload(){
    this.load.image('van', 'assets/images/van.jpg');
    this.load.image('ninja', 'assets/images/ninja.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('wallx', 'assets/images/wallx.png');
    this.load.image('wally', 'assets/images/wally.png');
    this.load.image('wallx_500', 'assets/images/wallx_500.png');
    this.load.image('wally_500', 'assets/images/wally_500.png');
    this.load.image('slash', 'assets/images/slash.png');
    this.load.image('shuriken', 'assets/images/shuriken.png');
     this.load.image('back', 'assets/images/bk.png');
}

function create(){
    // camera
    this.cameras.main.setBounds(0, 0, mapx, mapy);
    this.physics.world.setBounds(0, 0, mapx, mapy);

    // background
    this.add.image(mapy/2, mapy/2, 'back');

    // global time
    gg=this.time.now+(1000*60*10);

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
    this.cameras.main.startFollow(player, true, 0.05, 0.05, 0.05, 0.05);

    // obsticles
    wall = this.physics.add.staticGroup();
    wall.create(400, 200, 'wall');
    this.physics.add.collider(player, wall, fx); // collision handling

    wallx = this.physics.add.staticGroup();
    wally = this.physics.add.staticGroup();
    wallx_500 = this.physics.add.staticGroup();
    wally_500 = this.physics.add.staticGroup();
    //wallx.create(1000, 500, 'wallx');
    //wally.create(500, 1000, 'wally');
    wallx_500.create(1000, 500, 'wallx_500');
    wallx_500.create(1500, 500, 'wallx_500');
    wallx_500.create(2000, 500, 'wallx_500');
    wally_500.create(1000, 500, 'wally_500');
    wally_500.create(1000, 1000, 'wally_500');
    wally_500.create(1000, 1500, 'wally_500');
    this.physics.add.collider(player, wallx, fx);
    this.physics.add.collider(player, wally, fy);
    this.physics.add.collider(player, wallx_500, fx);
    this.physics.add.collider(player, wally_500, fy);

    // dash
    dash=0;
    dashtime=this.time.now;
    dashreg=this.time.now;
    // weapons
    options=1;
    kata=0;
    katatime=this.time.now;
    katareg=this.time.now;
    shuri=0;
    shuritime=this.time.now;
    shurireg=this.time.now;
    kibaku=0;
    saisei=0;
    // probably better if ninjas have to search for items!!

    // misc
    health=100;
    kills=0;

    // text
    text1=this.add.text(0, 0, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
    text2=this.add.text(700, 0, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
    text3=this.add.text(0, 580, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
    text4=this.add.text(700, 580, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
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
            dashreg=this.time.now+10000; // only 2 dashes
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
    if(pointer.leftButtonDown()){ // left click
        if(options==1 && this.time.now>katatime && kata>0){
            // play animation, if target infront than lose health
            // slash = this.physics.add.sprite(player.x+Math.cos(angle)*20, player.y+Math.sin(angle)*20, 'slash');
            katatime=this.time.now+100;
            kata--;
            katareg=this.time.now+1000;
        }
        if(options==2 && this.time.now>shuritime && shuri>0){
            shuriken = this.physics.add.sprite(player.x+Math.cos(angle)*20, player.y+Math.sin(angle)*20, 'shuriken');
            shuriken.setVelocityX(Math.cos(angle)*200);
            shuriken.setVelocityY(Math.sin(angle)*200);
            shuritime=this.time.now+100;
            shuri--;
            shurireg=this.time.now+1000;
        }
    }
    if(this.time.now>katareg){ // kata regen
        if(kata<10){
            katareg=this.time.now+1000;
            kata++;
        }
        else{
            katareg=this.time.now;
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
    otext='';
    if(options==1) otext='kata: infinite'; // melee
    if(options==2) otext='shuri: '+shuri+'/10'; // range
    if(options==3) otext='kibaku: '+kibaku+'/10'; // land mine
    if(options==4) otext='saisei: '+saisei+'/10'; // health regen

    // text
    text1.setText([
        'dash: '+dash+'/2', // blink
        otext, // options
    ]);
    text2.setText([
        'health: '+health, // health bar
        'kills: '+kills // #kills
    ]);
    text3.setText([
        'timer: '+Math.floor(((gg-this.time.now)/1000)/60)+':'+Math.floor(((gg-this.time.now)/1000)%60)
    ]);
    text4.setText([
        'vers: '+415
    ]);
}

function fx(player, wall){
    if(wall.y>player.y) player.y-=10;
    else player.y+=10;
}

function fy(player, wall){
    if(wall.x>player.x) player.x-=10;
    else player.x+=10;
}
