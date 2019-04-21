
function addPlayer(self, playerInfo) {
	self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
	self.ship.setDrag(100);
	self.ship.setAngularDrag(100);
	self.ship.setMaxVelocity(200);
	self.ship.setCollideWorldBounds(true);
}

function addOtherPlayers (self, playerInfo) {
	const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
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

function shipUpdate({ship,cursors,physics,socket}){
	if(!ship) return;
	if (cursors.left.isDown) {
		ship.setAngularVelocity(-150);
	} else if (cursors.right.isDown) {
		ship.setAngularVelocity(150);
	} else {
		ship.setAngularVelocity(0);
	}

	if (cursors.up.isDown) {
		physics.velocityFromRotation(ship.rotation + 1.5, 100, ship.body.acceleration);
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
