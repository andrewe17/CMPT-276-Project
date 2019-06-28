var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var score = 0;
var gameOver = false;
var pointer;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('redX', 'assets/redX.png');
    this.load.image('van', 'assets/van.jpg');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //pointer stores raw data of mouse
    //e.g. pointer.worldX will return the position of cursor on canvas
    pointer = this.input.activePointer;

    this.cameras.main.setBounds(0, 0, 3723, 2000);
    this.physics.world.setBounds(0, 0, 3723, 2000);

    //add image to background
    this.add.image(1861, 1000, 'van');

    //cool particles effect for player
    var particles = this.add.particles('star');
    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    //add player to world
    player = this.physics.add.image(400, 300, 'bomb');
    //make placer collidable with world boundray.
    player.setCollideWorldBounds(true);

    //make camera follow the player 
    this.cameras.main.startFollow(player, true, 0.08, 0.08,0.08,0.08);

    //add the emitter to player 
    emitter.startFollow(player);

}


function update ()
{

    if (gameOver)
    {
        return;
    }

    //control detection and position updating
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-160);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(160);
    }
    else
    { 
        player.setVelocityY(0);
    }
}

//this function will be called when a dash operation is vallid
function dash(){

}

//this function is used to check wheather a dash is permiited or not
function checkDash(){

    //will return a boolen
    return true; // default
}

