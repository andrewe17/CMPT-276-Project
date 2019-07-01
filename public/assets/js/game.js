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
    //wallx_500.create(500, 50, 'wallx_500');
    //wallx_500.create(1000, 50, 'wallx_500');
    //wallx_500.create(1500, 50, 'wallx_500');
    //wally_500.create(250, 50+250, 'wally_500');
    //wally_500.create(250, 50+250+500, 'wally_500');
    //wally_500.create(250, 50+250+1000, 'wally_500');
    for(var i=0; i<100; i++){
        maze(mapx,mapy);
    }
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
        'vers: '+525
    ]);
}

// checks collision
function fx(player, wall){
    if(wall.y>player.y) player.y-=5;
    else player.y+=5;
}
function fy(player, wall){
    if(wall.x>player.x) player.x-=5;
    else player.x+=5;
}

// update this to create a random maze generator
function maze(mapx,mapy){
    var disp = generator(20,20);
    for (var i=0; i<disp.length; i++){
        for (var j=0; j<disp[i].length; j++){
            if (disp[i][j][0]==0) wallx.create(i*100, j*100, 'wallx');
            if (disp[i][j][1]==0) wally.create(i*100, j*100, 'wally');
            if (disp[i][j][2]==0) wallx.create(i*100, (j+1)*100, 'wallx');
            if (disp[i][j][3]==0) wally.create((i+1)*100, j*100, 'wally');
        }
    }
}

// need to rewrite this...
function generator(x, y){
    // initialize starting grid
    var total = x*y;
    var cells = new Array();
    var unvis = new Array();
    for(var i=0; i<y; i++){
        cells[i]=new Array();
        unvis[i]=new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j]=[0,0,0,0]; // cell grid
            unvis[i][j]=true; // visited
        }
    }
    
    // Set a random position to start from
    var current=[0,0]; // starting position
    var path=[current];
    unvis[current[0]][current[1]] = false;
    var visited = 1;
    
    // Loop through all available cell positions
    while (visited < total) {
        // Determine neighboring cells
        var pot = [[current[0]-1, current[1], 0, 2],
                [current[0], current[1]+1, 1, 3],
                [current[0]+1, current[1], 2, 0],
                [current[0], current[1]-1, 3, 1]];
        var neighbors=new Array();
        
        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }
        
        // If at least one active neighboring cell has been found
        if (neighbors.length){
            // Choose one of the neighbors at random
            next = neighbors[Math.floor(Math.random()*neighbors.length)];
            
            // Remove the wall between the current cell and the chosen neighboring cell
            cells[current[0]][current[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;
            
            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            current = [next[0], next[1]];
            path.push(current);
        }
        // Otherwise go back up a step and keep going
        else {
            current = path.pop();
        }
    }
    return cells;
}