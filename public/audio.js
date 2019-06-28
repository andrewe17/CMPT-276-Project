// audio example: https://phaser.io/examples/v3/view/audio/web-audio/play-sound-on-keypress
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('Bless', 'assets/BillyBless.jpg');

    this.load.audio('swing',  ['assets/SwordSwing.mp3'] );
    this.load.audio('background1',  ['assets/BlackHawkDown.mp3'] );
    this.load.audio('background2',  ['assets/Shingeki.mp3'] );
}

function create ()
{
    this.add.image(700, 700, 'Bless').setOrigin(1);


    var swing = this.sound.add('swing');
    var background1 = this.sound.add('background1');
    var background2 = this.sound.add('background2');

     
     var keys = [
        'Press Z for Swing Sound Effect',
        'Press A for BlackHawkDown',
        'Press S for Attack on Titan',
        '',
        'SPACE to stop all sounds'
    ];

    var text = this.add.text(10, 10, keys, { font: '32px Courier', fill: '#00ff00' });

    if (this.sound.locked)
    {
        text.setText('Click to start');

        this.sound.once('unlocked', function ()
        {
            text.setText(keys);
        });
    }
    

    this.input.keyboard.on('keydown-SPACE', function () {
        this.sound.stopAll();
    }, this);


    // for audio to play in the background, delete input function leaving "<name>.play();" inside create function
    this.input.keyboard.on('keydown-A', function () {
        background1.play();
    });
    this.input.keyboard.on('keydown-S', function () {
        background2.play();
    });
    this.input.keyboard.on('keydown-Z', function () {
        swing.play();
    });
}
