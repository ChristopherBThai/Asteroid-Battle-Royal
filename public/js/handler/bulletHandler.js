function bulletUpdate(self){
	let {ship,cursors,physics,socket} = self;

	if(cursors.fire.isDown){
		fireBullet(self,ship);
	}
}

function fireBullet(self,playerInfo){
	var bullet = self.physics.add.image(playerInfo.x, playerInfo.y, 'bullet').setOrigin(0.5, 0.5).setDisplaySize(15, 15);
	bullet.ownerId = playerInfo.playerId;
	bullet.setDrag(0);
	bullet.setMaxVelocity(300);
	bullet.setRotation(playerInfo.rotation);
	//self.physics.velocityFromRotation(bullet.rotation, 200, bullet.body.acceleration);
	//bullet.body.velocityFromRotation(playerInfo.rotation,200);
	bullet.setVelocity(toXVel(200,bullet.rotation),toYVel(200,bullet.rotation));
	//self.myBullets.add(bullet);
}

function toXVel(speed,radians){
	return -1*Math.sin(radians)*speed;
}

function toYVel(speed,radians){
	return Math.cos(radians)*speed;
}
