
function addPlayer(self, playerInfo) {
	self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.3).setDisplaySize(50,50);
	self.ship.health = 3;
	self.ship.setDrag(25);
	self.ship.setAngularDrag(100);
	self.ship.setMaxVelocity(350);
	self.ship.setCollideWorldBounds(true);
//	self.ship.radius = Math.pow(Math.pow(53,2),Math.pow(40,2),.5);
	self.ship.radius = 25;
	self.dead = false;
	self.gameOver = false;
	resetHearts();
}

function addOtherPlayers (self, playerInfo) {
	const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.3).setDisplaySize(50, 50);
	otherPlayer.playerId = playerInfo.playerId;
	self.otherPlayers.add(otherPlayer);
}

function playerMoved (self,playerInfo){
	self.otherPlayers.getChildren().forEach(function (otherPlayer) {
		if (playerInfo.playerId === otherPlayer.playerId) {
			otherPlayer.setRotation(playerInfo.rotation);
			otherPlayer.setPosition(playerInfo.x, playerInfo.y);
		}
	});
}


function shipUpdate(self){
	let {ship,cursors,physics,socket} = self;

	if(!ship||self.gameOver)
	{
		return;
	}
	if(self.dead){ 
		ship.destroy();
		//delete self.ship;
		self.gameOver = true;
		CreateRespawnButton(self);
		return;
	}
	if (cursors.left.isDown) {
		ship.setAngularVelocity(-300);
	} else if (cursors.right.isDown) {
		ship.setAngularVelocity(300);
	} else {
		ship.setAngularVelocity(0);
	}

	if (cursors.up.isDown) {
		physics.velocityFromRotation(ship.rotation + 1.5, 420, ship.body.acceleration);
	} else if(cursors.down.isDown){
		physics.velocityFromRotation(ship.rotation + 1.5, -300, ship.body.acceleration);
	} else {
		ship.setAcceleration(0);
	}

	physics.world.wrap(ship, 5);

	// emit player movement
	var x = ship.x;
	var y = ship.y;
	var r = ship.rotation;
	if (ship.oldPosition && (x !== ship.oldPosition.x || y !== ship.oldPosition.y || r !== ship.oldPosition.rotation)) {
		socket.emit('playerMovement', { x: ship.x, y: ship.y, rotation: ship.rotation });
	}
	// save old position data
	ship.oldPosition = {
		x: ship.x,
		y: ship.y,
		rotation: ship.rotation
	};
}
