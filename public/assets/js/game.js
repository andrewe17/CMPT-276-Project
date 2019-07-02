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

var mapx = 2780; // need a map that's 3000+200 x 
var mapy = 2780; // and 2000+200 y 
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
var vol=200; // velocity
var volx=200, voly=200;
// objects
var player;
var wall;
// dash
var dash;
var dashtime;
var dashreg;
var dashani;
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
var health, kills, deaths; // misc
var text1, text2, text3, text4; // textbox

// mouse
var mousex;
var mousey;
var angle;

function preload(){
    this.load.image('van', 'assets/images/van.jpg'); // delete this
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('wallx', 'assets/images/wallx.png');
    this.load.image('wally', 'assets/images/wally.png');
    this.load.image('slash', 'assets/images/slash.png');
    this.load.image('shuriken', 'assets/images/shuriken.png');
    this.load.image('back', 'assets/images/bk.png');
    this.load.image('ninja', 'assets/images/ninja.png');
    this.load.image('slash', 'assets/images/slash.png');
    this.load.image('shuri', 'assets/images/shuri.png');
    this.load.spritesheet('ninja_up', 'assets/images/ninja_up.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('ninja_down', 'assets/images/ninja_down.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('ninja_left', 'assets/images/ninja_left.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('ninja_right', 'assets/images/ninja_right.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('ninja_smoke', 'assets/images/ninja_smoke.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('slash_anim', 'assets/images/slash_anim.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('shuri_anim', 'assets/images/shuri_anim.png', {frameWidth: 13, frameHeight: 13});
    this.load.audio('swing',  ['assets/SwordSwing.mp3'] );
}

function create(){
    
    // audio 
    // example: https://phaser.io/examples/v3/view/audio/web-audio/play-sound-on-keypress
    /*
    if (this.sound.locked)
    {
        text.setText('Click to start');

        this.sound.once('unlocked', function ()
        {
            text.setText(keys);
        });
    }
    */
    this.input.keyboard.on('keydown-SPACE', function () {
        this.sound.stopAll();
    }, this);
    // for audio to play in the background, delete input function leaving "<name>.play();" inside create function
    this.input.keyboard.on('keydown-Z', function () {
        swing.play();
    });

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

    // walls
    wallx = this.physics.add.staticGroup();
    wally = this.physics.add.staticGroup();
    maze(mapx,mapy);
    this.physics.add.collider(player, wallx, fx);
    this.physics.add.collider(player, wally, fy);

    // dash
    dash=0;
    dashtime=this.time.now;
    dashreg=this.time.now;
    // animations
    this.anims.create({
        key: 'ninja_up',
        frames: this.anims.generateFrameNumbers('ninja_up'),
        frameRate: 16,
        repeat: -1
    });
    this.anims.create({
        key: 'ninja_down',
        frames: this.anims.generateFrameNumbers('ninja_down'),
        frameRate: 16,
        repeat: -1
    });
    this.anims.create({
        key: 'ninja_left',
        frames: this.anims.generateFrameNumbers('ninja_left'),
        frameRate: 16,
        repeat: -1
    });
    this.anims.create({
        key: 'ninja_right',
        frames: this.anims.generateFrameNumbers('ninja_right'),
        frameRate: 16,
        repeat: -1
    });
    this.anims.create({
        key: 'ninja_smoke',
        frames: this.anims.generateFrameNumbers('ninja_smoke'),
        frameRate: 16,
        repeat: 1
    });
    this.anims.create({
        key: 'slash_anim',
        frames: this.anims.generateFrameNumbers('slash_anim'),
        frameRate: 16,
        repeat: 1
    });
    this.anims.create({
        key: 'shuri_anim',
        frames: this.anims.generateFrameNumbers('shuri_anim'),
        frameRate: 16,
        repeat: -1
    });

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
    deaths=0;

    // text
    text1=this.add.text(0, 0, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
    text2=this.add.text(700, 0, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
    text3=this.add.text(0, 580, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
    text4=this.add.text(700, 580, '', {fontFamily:'"Roboto Condensed"', fill: '#000'}).setScrollFactor(0);
}

function update(){
    // keyboard
    if(w.isDown){
        if(player.anims.getCurrentKey()!='ninja_up') player.play('ninja_up');
        if(a.isDown || d.isDown) player.setVelocityY(-vol/2);
        else player.setVelocityY(-vol);
    }
    else if(s.isDown){
        if(player.anims.getCurrentKey()!='ninja_down') player.play('ninja_down');
        if(a.isDown || d.isDown) player.setVelocityY(vol/2);
        else player.setVelocityY(vol);
    }
    else{
        player.anims.stop();
        player.setVelocityY(0);
    }
    if(a.isDown){
        if(player.anims.getCurrentKey()!='ninja_left') player.play('ninja_left');
        if(w.isDown || s.isDown) player.setVelocityX(-vol/2);
        else player.setVelocityX(-vol);
    }
    else if(d.isDown){
        if(player.anims.getCurrentKey()!='ninja_right') player.play('ninja_right');
        if(w.isDown || s.isDown) player.setVelocityX(vol/2);
        else player.setVelocityX(vol);
    }
    else{
        player.anims.stop();
        player.setVelocityX(0);
    }
    if(one.isDown) options=1; // items
    if(two.isDown) options=2;
    if(three.isDown) options=3;
    if(four.isDown) options=4;

    // mouse
    pointer = this.input.activePointer; // refresh coordinate
    if(player.x<400) mousex=pointer.x-player.x; // distance between mouse & player
    else if(player.x>(mapx-400)) mousex=pointer.x-(player.x-(mapx-800));
    else mousex=pointer.x-400;
    if(player.y<300) mousey=pointer.y-player.y; // distance between mouse & player
    else if(player.y>(mapy-300)) mousey=pointer.y-(player.y-(mapy-600));
    else  mousey=pointer.y-300;
    angle = Math.atan(mousey/mousex); // angle between mouse & player
    if(mousex<0) angle+=Math.PI;
        
    // dash
    if(space.isDown && dash>0){
        if(this.time.now>dashtime){
            var smoke=this.physics.add.sprite(player.x, player.y, 'ninja');
            smoke.play('ninja_smoke');
            smoke.killOnComplete = true;

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

    // use items
    if(pointer.leftButtonDown()){ // left click
        if(options==1 && this.time.now>katatime && kata>0){
            var slash=this.physics.add.sprite(player.x+Math.cos(angle)*32, player.y+Math.sin(angle)*32, 'slash');
            slash.play('slash_anim');
            slash.killOnComplete = true;
            // if hit -50 hp
            katatime=this.time.now+100;
            kata--;
            katareg=this.time.now+1000;
        }
        if(options==2 && this.time.now>shuritime && shuri>0){
            var toss=this.physics.add.sprite(player.x+Math.cos(angle)*32, player.y+Math.sin(angle)*32, 'shuri');
            toss.play('shuri_anim');
            toss.setVelocityX(Math.cos(angle)*300);
            toss.setVelocityY(Math.sin(angle)*300);
            // if hit -10 hp
            shuritime=this.time.now+100;
            shuri--;
            shurireg=this.time.now+1000;
        }
    }

    // regen
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

    // SPAWNING POINTS
    // UPGRADE AREA: UPGRADE CHANGED TO OPTIONS 1,2,3,4 
    // UPGRADES: #SHURIKENS, SHURIKEN SPEED, REGEN SPEED, DAMAGE, EXPLOSION RADIUS
    // limited views --> we need to either have fog of war or make the camera display a smaller area...
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
        'kills: '+kills, // #kills
        'deaths: '+deaths // #kills
    ]);
    text3.setText([
        'timer: '+Math.floor(((gg-this.time.now)/1000)/60)+':'+Math.floor(((gg-this.time.now)/1000)%60)
    ]);
    text4.setText([
        'vers: '+407
    ]);
}

// checks collision
function fx(player, wall){
    if(wall.y>player.y) player.y-=3;
    else player.y+=3;
    
}
function fy(player, wall){
    if(wall.x>player.x) player.x-=3;
    else player.x+=3;
}

// create maze
function maze(){
    var maze=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,1,1,1,1,1,0,1,0,0,0,1,0,0],
        [0,0,1,1,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0],
        [0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0],
        [0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,0,1,1,0,1,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0],
        [0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];

    for (var i=0; i<=34; i++){
        for (var j=0; j<=60; j++){
            if(maze[i][j]==1){
                if(maze[i][j-1]==0 || maze[i][j+1]==0){
                    wally.create((j*50)+100,(i*50)+100, 'wally');
                }
                else{
                    wallx.create((j*50)+100,(i*50)+100, 'wallx');
                }
            }
            if(maze[i][j]==2){
                // rune
            } 
        }
    }
}