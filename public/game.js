var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    //this.load.image('sky', 'sky.png');
    this.load.image('logo', 'face.jpg');
    this.load.image('green', 'green.png');
}

function create ()
{
    this.add.image(400, 300, 'green');
    //this.add.image(400, 300, 'sky');

    var logo = this.physics.add.image(400, 100, 'logo');

    //logo.setVelocity(200, 200);
    //logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    //emitter.startFollow(logo);
}

function update(){
    this.cursors = this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D
    });

    if(cursors.up.isDown) player.setVelocityY(-160);
    if(cursors.down.isDown) player.setVelocityY(160);
    if(cursors.left.isDown) player.setVelocityX(-160);
    if(cursors.right.isDown) player.setVelocityX(160);
}