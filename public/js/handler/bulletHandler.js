function createBullet(self){
	self.socket.on('newBullet',function(data){
		enemyBullet(self,data);
	});
}

function bulletUpdate(self){
	let {ship,cursors,physics,socket} = self;

	if(cursors.fire.isDown){
		let bullet = fireBullet(self,ship).body;
		socket.emit('createBullet',{velx:bullet.velocity.x,vely:bullet.velocity.y,x:bullet.position.x,y:bullet.position.y});
	}
}

function enemyBullet(self,data){
	var bullet = self.physics.add.image(data.x, data.y, 'bullet').setOrigin(0.5, 0.5).setDisplaySize(15, 15);
	bullet.ownerId = data.ownerId;
	bullet.setDrag(0);
	bullet.setMaxVelocity(300);
	bullet.setVelocity(data.velx,data.vely);
	return bullet;
}

function fireBullet(self,playerInfo){
	var bullet = self.physics.add.image(playerInfo.x, playerInfo.y, 'bullet').setOrigin(0.5, 0.5).setDisplaySize(15, 15);
	bullet.ownerId = playerInfo.playerId;
	bullet.setDrag(0);
	bullet.setMaxVelocity(300);
	bullet.setRotation(playerInfo.rotation);
	bullet.setVelocity(toXVel(200,bullet.rotation),toYVel(200,bullet.rotation));
	return bullet;
}

function toXVel(speed,radians){
	return -1*Math.sin(radians)*speed;
}

function toYVel(speed,radians){
	return Math.cos(radians)*speed;
}
