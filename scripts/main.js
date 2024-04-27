let config = {
    type: Phaser.AUTO,
    width: 1720,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let game = new Phaser.Game( config );

let player, goal, result, cursors, textScore, score;

function preload() {
    this.load.image( "player", "../assets/images/dish.png" );
    this.load.image( "goal", "../assets/images/pizza.png" );
    this.load.image( "result", "../assets/images/pizzadish.png" );
    this.load.image( "background", "../assets/images/city.png" );
}

function create() {
    this.add.image( 0, 0, "background" ).setOrigin( 0, 0 );

    player = this.physics.add.sprite( 250, 800, "player" );
    player.setBounce( 0 );
    player.setCollideWorldBounds( true );
    player.setScale( 5 );

    goal = this.physics.add.sprite( 1500, 800, "goal" );
    goal.setScale( 5 );

    // result = this.add.image( 700, 700, "result" );
    // result.setScale( 5 );

    score = 0;
    let style = { font: "50px Arial", fill: "#FFFB03" };
    textScore = this.add.text( 50, 50, "Score: " + score.toString(), style );

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {

    // result.disableBody( true, true ); 

    if (cursors.left.isDown) {
        player.x -= 10;
        player.flipX = true;
    }
    if (cursors.right.isDown) {
        player.x += 10;
        player.flipX = false;
    }

    if (player.body.touching.down || player.body.touching.up || player.body.touching.left || player.body.touching.right ){
        player.x = 0;
    }

    this.physics.add.overlap( player, goal, WinGame );
}

function WinGame() {
    score += 10;
    textScore.setText( "Score: " + score );
    goal.disableBody( true, true );
    // result.showGameObject( true );
    alert( "You've made food!" );
    // result = this.add.image( 700, 700, "result" );
    // result.setScale( 5 );
}