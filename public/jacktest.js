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
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var cameraa;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('van', 'assets/van.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{

    this.cameras.main.setBounds(0, 0, 3723, 2000);
    this.physics.world.setBounds(0, 0, 3723, 2000);

    this.add.image(1861, 1000, 'van');

    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.image(400, 300, 'bomb');
    var particles = this.add.particles('star');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(player);
    emitter.startFollow(player);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

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

