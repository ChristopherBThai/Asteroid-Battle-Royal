canvas_width = window.innerWidth;// * window.devicePixelRatio;
canvas_height = window.innerHeight;// * window.devicePixelRatio;

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: canvas_width,
  height: canvas_height,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('ship', 'assets/ship.png');
	this.load.image('otherPlayer', 'assets/ship.png');
	this.load.image('bullet', 'assets/star_gold.png');
	this.load.image('asteroid', 'assets/asteroid.png');
	this.load.image('health', 'assets/heart.jpg');
	this.load.image('death', 'assets/death.png');
	this.load.image('blue', 'assets/blue.png');
}

function create() {
	var self = this;
	this.socket = io();
	this.otherPlayers = this.physics.add.group();
	this.asteroids = this.physics.add.group();

	createWorld(this);
	createBullet(this);
	createAsteroid(this);
	createHealth(this);
	createBackground(this);
	createScore(this);

	this.socket.on('currentPlayers', function (players) {
		Object.keys(players).forEach(function (id) {
			if (players[id].playerId === self.socket.id) {
				addPlayer(self, players[id]);
				createCamera(self);
			} else {
				addOtherPlayers(self, players[id]);
			}
		});
	});

	this.socket.on('newPlayer', function (playerInfo) {
		addOtherPlayers(self, playerInfo);
	});

	this.socket.on('disconnect', function (playerId) {
		self.otherPlayers.getChildren().forEach(function (otherPlayer) {
			if (playerId === otherPlayer.playerId) {
				otherPlayer.destroy();
			}
		});
	});

	this.socket.on('playerMoved', function (playerInfo) {
		playerMoved(self,playerInfo);
	});

	this.cursors = this.input.keyboard.addKeys(
		{up:Phaser.Input.Keyboard.KeyCodes.W,
		down:Phaser.Input.Keyboard.KeyCodes.S,
		left:Phaser.Input.Keyboard.KeyCodes.A,
		right:Phaser.Input.Keyboard.KeyCodes.D,
		fire:Phaser.Input.Keyboard.KeyCodes.J});

}

function update() {
	shipUpdate(this);
	bulletUpdate(this);
}

