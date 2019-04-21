<<<<<<< HEAD
var canShoot = true;
var shootCooldown = 300;
var bulletSpeed = 400;
var bulletLife = 10000;
=======
>>>>>>> master

function createBullet(self){
	self.socket.on('newBullet',function(data){
		enemyBullet(self,data);
	});
}

function bulletUpdate(self){
	let {ship,cursors,physics,socket} = self;

	if(canShoot&&cursors.fire.isDown){
		canShoot = false;
		setTimeout(function(){canShoot = true;},shootCooldown);
		let bullet = fireBullet(self,ship).body;
		socket.emit('createBullet',{velx:bullet.velocity.x,vely:bullet.velocity.y,x:bullet.position.x,y:bullet.position.y});
	}
}

function enemyBullet(self,data){
	var bullet = self.physics.add.image(data.x, data.y, 'bullet').setOrigin(0.5, 0.5).setDisplaySize(15, 15);
	bullet.ownerId = data.ownerId;
	bullet.setDrag(0);
	bullet.setMaxVelocity(bulletSpeed);
	bullet.setVelocity(data.velx,data.vely);
	self.physics.add.overlap(self.ship,bullet,function()
	{
		self.dead = true;
		bullet.destroy();
	});

	return bullet;
}

function fireBullet(self,playerInfo){
	var bullet = self.physics.add.image(playerInfo.x, playerInfo.y, 'bullet').setOrigin(0.5, 0.5).setDisplaySize(15, 15);
	setTimeout(function(){
		bullet.destroy();
	},bulletLife);
	bullet.ownerId = playerInfo.playerId;
	bullet.setDrag(0);
	bullet.setMaxVelocity(bulletSpeed);
	bullet.setRotation(playerInfo.rotation);
	bullet.setVelocity(toXVel(bulletSpeed,bullet.rotation),toYVel(bulletSpeed,bullet.rotation));
	return bullet;
}

function destroyBullet(bullet){
	bullet.destroy();
}

function toXVel(speed,radians){
	return -1*Math.sin(radians)*speed;
}

function toYVel(speed,radians){
	return Math.cos(radians)*speed;
}
